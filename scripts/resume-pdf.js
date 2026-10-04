#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Render resume.pdf from the built /resume/ page, so the PDF always matches the site.
 *
 *   npm run build && npm run resume:pdf     (npm run deploy does both)
 *
 * Needs a Chromium-based browser: set CHROME_PATH, or install Google Chrome or Brave.
 * Writes public/resume.pdf (deployed) and static/resume.pdf (committed, used by other hosts).
 */
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');

const execFileAsync = promisify(execFile);

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

function findBrowser() {
  const home = os.homedir();
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  // Chrome for Testing / headless shell downloaded by Puppeteer, if present.
  const puppeteerCache = path.join(home, '.cache', 'puppeteer', 'chrome-headless-shell');
  if (fs.existsSync(puppeteerCache)) {
    fs.readdirSync(puppeteerCache).forEach(version => {
      const dir = path.join(puppeteerCache, version);
      fs.readdirSync(dir).forEach(sub => {
        candidates.push(path.join(dir, sub, 'chrome-headless-shell'));
      });
    });
  }
  // Last resort: other Chromium browsers (Brave's headless printing is unreliable).
  candidates.push(
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  );
  return candidates.find(p => p && fs.existsSync(p));
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
};

function serve() {
  const server = http.createServer((req, res) => {
    let file = path.join(publicDir, decodeURIComponent(req.url.split('?')[0]));
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html');
    }
    if (!file.startsWith(publicDir) || !fs.existsSync(file)) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function main() {
  if (!fs.existsSync(path.join(publicDir, 'resume', 'index.html'))) {
    console.error('public/resume/ not found. Run `npm run build` first.');
    process.exit(1);
  }
  const browser = findBrowser();
  if (!browser) {
    console.error('No Chromium-based browser found. Install Chrome or set CHROME_PATH.');
    process.exit(1);
  }

  const server = await serve();
  const url = `http://127.0.0.1:${server.address().port}/resume/`;
  const out = path.join(publicDir, 'resume.pdf');
  // The build copies the committed static/resume.pdf into public/; remove it so a failed
  // render can't pass the check below with the old file.
  fs.rmSync(out, { force: true });
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'resume-pdf-'));

  try {
    await execFileAsync(
      browser,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        `--user-data-dir=${profileDir}`,
        '--no-pdf-header-footer',
        '--run-all-compositor-stages-before-draw',
        '--virtual-time-budget=10000',
        `--print-to-pdf=${out}`,
        url,
      ],
      { timeout: 60000 },
    );
  } finally {
    server.close();
    fs.rmSync(profileDir, { recursive: true, force: true });
  }

  if (!fs.existsSync(out) || fs.statSync(out).size < 10000) {
    console.error('resume.pdf was not generated correctly.');
    process.exit(1);
  }
  fs.copyFileSync(out, path.join(root, 'static', 'resume.pdf'));
  console.log(
    `resume.pdf written (${Math.round(fs.statSync(out).size / 1024)} KB) using ${path.basename(
      browser,
    )}`,
  );
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
