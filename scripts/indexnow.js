#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Notify IndexNow-enabled search engines (Bing, Yandex, Seznam, Naver…) that the
 * site's pages changed, so they recrawl quickly. Bing's index also feeds ChatGPT search.
 *
 * Run after a deploy:  npm run ping
 * Reads the URLs from the built sitemap in public/.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { indexNowKey } = require('../src/config');

const siteUrl = process.env.GATSBY_SITE_URL || 'https://bijay3030.github.io';
const sitemap = path.join(__dirname, '..', 'public', 'sitemap-0.xml');

if (!fs.existsSync(sitemap)) {
  console.error('No public/sitemap-0.xml found. Run `npm run build` first.');
  process.exit(1);
}

const urlList = [...fs.readFileSync(sitemap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  match => match[1],
);

const body = JSON.stringify({
  host: new URL(siteUrl).host,
  key: indexNowKey,
  keyLocation: `${siteUrl}/${indexNowKey}.txt`,
  urlList,
});

const request = https.request(
  'https://api.indexnow.org/indexnow',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  },
  response => {
    console.log(`IndexNow responded ${response.statusCode} for ${urlList.length} URLs.`);
    if (response.statusCode >= 300) {
      process.exitCode = 1;
    }
  },
);

request.on('error', error => {
  console.error('IndexNow request failed:', error.message);
  process.exitCode = 1;
});

request.end(body);
