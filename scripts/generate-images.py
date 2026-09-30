#!/usr/bin/env python3
"""
Generate the architecture diagrams (SVG + PNG cover) for each case study and the
Open Graph share images (PNG) for the home page and each project page.

Requires `rsvg-convert` (brew install librsvg). Run from the repo root:

    python3 scripts/generate-images.py

Diagrams are deliberately generic (no client names, URLs, or data) so NDA work
can be shown safely.
"""
import os
import subprocess
from html import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

NAVY = '#0a192f'
LIGHT_NAVY = '#112240'
LIGHTEST_NAVY = '#233554'
SLATE = '#8892b0'
LIGHT_SLATE = '#a8b2d1'
LIGHTEST_SLATE = '#ccd6f6'
GREEN = '#64ffda'
SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif'
MONO = 'Menlo, SF Mono, monospace'


def render(svg_path, png_path, width, height):
    subprocess.run(
        ['rsvg-convert', '-w', str(width), '-h', str(height), svg_path, '-o', png_path],
        check=True,
    )


# ---------------------------------------------------------------------------
# Architecture diagrams
# ---------------------------------------------------------------------------

W, H = 1200, 700
BOX_W, BOX_H = 260, 84
COLS = [48, 470, 892]  # left edges of the three columns
ROWS = [170, 340, 510]  # top edges of the three rows


def box(x, y, title, sub='', accent=False, w=BOX_W, h=BOX_H):
    stroke = GREEN if accent else LIGHTEST_NAVY
    out = [
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{LIGHT_NAVY}" '
        f'stroke="{stroke}" stroke-width="2"/>',
        f'<text x="{x + w / 2}" y="{y + (36 if sub else 50)}" text-anchor="middle" '
        f'font-family="{SANS}" font-size="20" font-weight="700" fill="{LIGHTEST_SLATE}">'
        f'{escape(title)}</text>',
    ]
    if sub:
        out.append(
            f'<text x="{x + w / 2}" y="{y + 62}" text-anchor="middle" font-family="{MONO}" '
            f'font-size="14" fill="{SLATE}">{escape(sub)}</text>'
        )
    return '\n'.join(out)


def arrow(x1, y1, x2, y2, label='', dashed=False, label_dx=0, label_dy=-10):
    dash = ' stroke-dasharray="6 6"' if dashed else ''
    out = [
        f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{GREEN}" stroke-width="2"'
        f'{dash} marker-end="url(#arrow)"/>'
    ]
    if label:
        mx, my = (x1 + x2) / 2 + label_dx, (y1 + y2) / 2 + label_dy
        out.append(
            f'<text x="{mx}" y="{my}" text-anchor="middle" font-family="{MONO}" '
            f'font-size="13" fill="{LIGHT_SLATE}">{escape(label)}</text>'
        )
    return '\n'.join(out)


def diagram(title, caption, body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="{escape(title)} architecture diagram">
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" fill="{GREEN}"/>
  </marker>
</defs>
<rect width="{W}" height="{H}" fill="{NAVY}"/>
<text x="48" y="60" font-family="{MONO}" font-size="16" fill="{GREEN}">{escape(caption)}</text>
<text x="48" y="96" font-family="{SANS}" font-size="30" font-weight="700" fill="{LIGHTEST_SLATE}">{escape(title)}</text>
{body}
</svg>'''


def node(col, row, title, sub='', accent=False):
    return box(COLS[col], ROWS[row], title, sub, accent)


def cx(col):
    return COLS[col] + BOX_W / 2


def cy(row):
    return ROWS[row] + BOX_H / 2


def right_to(col, row, label='', reverse=False):
    """Horizontal arrow between column `col` and `col + 1` on `row`."""
    x1, x2 = COLS[col] + BOX_W + 2, COLS[col + 1] - 2
    if reverse:
        x1, x2 = x2, x1
    return arrow(x1, cy(row), x2, cy(row), label)


def down_to(col, row, label=''):
    """Vertical arrow between `row` and `row + 1` in column `col`."""
    return arrow(cx(col), ROWS[row] + BOX_H + 2, cx(col), ROWS[row + 1] - 2, label, label_dx=48, label_dy=4)


DIAGRAMS = {
    'Helios': diagram(
        'Helios — intake to delivery',
        'Architecture (simplified, client details removed)',
        '\n'.join([
            node(0, 0, 'Client upload', 'files + job details'),
            node(1, 0, 'Rails 7 app', 'React UI · Pundit', accent=True),
            node(2, 0, 'AWS S3', 'source + delivered files'),
            node(0, 1, 'Redis', 'job queue'),
            node(1, 1, 'Sidekiq workers', 'validate · route · price'),
            node(2, 1, 'PostgreSQL', 'jobs · vendors · audit log'),
            node(0, 2, 'Project managers', 'real-time dashboard'),
            node(1, 2, 'ActionCable', 'live job status'),
            node(2, 2, 'Vendors & billing', 'work orders · invoices'),
            right_to(0, 0, 'upload'),
            right_to(1, 0, 'store'),
            down_to(1, 0, 'enqueue'),
            right_to(0, 1, 'queue', reverse=True),
            right_to(1, 1, 'persist'),
            down_to(1, 1, 'broadcast'),
            right_to(0, 2, 'push', reverse=True),
            arrow(COLS[1] + BOX_W, ROWS[1] + BOX_H, COLS[2] + 20, ROWS[2] - 2, 'generate', dashed=True, label_dx=40),
        ]),
    ),
    'Quoting': diagram(
        'Quoting — request to approved quote',
        'Architecture (simplified, client details removed)',
        '\n'.join([
            node(0, 0, 'Intake systems', 'external requests'),
            node(1, 0, 'Rails 7 API', 'ingest · Pundit', accent=True),
            node(2, 0, 'AWS S3', 'file lists · word counts'),
            node(0, 1, 'React 18 editor', 'line items per language'),
            node(1, 1, 'Worksheet rules', 'pricing engine'),
            node(2, 1, 'PostgreSQL', 'versioned quotes'),
            node(0, 2, 'ActionCable', 'live sync between PMs'),
            node(1, 2, 'Approval', 'submit / reject'),
            node(2, 2, 'Delivery workflow', 'approved quotes'),
            right_to(0, 0, 'request'),
            right_to(1, 0, 'files'),
            down_to(1, 0, 'estimate'),
            right_to(0, 1, 'draft', reverse=True),
            right_to(1, 1, 'new version'),
            down_to(0, 1, 'edits'),
            right_to(0, 2, 'review'),
            right_to(1, 2, 'handoff'),
        ]),
    ),
    'AListEngine': diagram(
        'AListEngine — photos to published listings',
        'Architecture (simplified)',
        '\n'.join([
            node(0, 0, 'Seller upload', 'photos + category'),
            node(1, 0, 'Rails + React app', 'listing workspace', accent=True),
            node(2, 0, 'AI vision + text', 'model API'),
            node(0, 1, 'Seller review', 'edit + approve'),
            node(1, 1, 'Rules engine', 'seller fields · formats'),
            node(2, 1, 'Draft listing', 'title · copy · price'),
            node(0, 2, 'Shopify', 'export'),
            node(1, 2, 'AuctionFlex', 'export'),
            node(2, 2, 'LiveAuctioneers', 'export'),
            right_to(0, 0, 'upload'),
            right_to(1, 0, 'analyze'),
            down_to(2, 0, 'generate'),
            right_to(1, 1, 'normalize', reverse=True),
            right_to(0, 1, 'draft', reverse=True),
            down_to(0, 1, 'publish'),
            arrow(COLS[0] + BOX_W - 10, ROWS[1] + BOX_H + 2, cx(1), ROWS[2] - 2),
            arrow(COLS[0] + BOX_W, ROWS[1] + BOX_H - 10, cx(2) - 40, ROWS[2] - 2),
        ]),
    ),
}


# ---------------------------------------------------------------------------
# Open Graph images (1200x630)
# ---------------------------------------------------------------------------

def og(kicker, title, subtitle_lines, footer):
    lines = '\n'.join(
        f'<text x="80" y="{360 + i * 40}" font-family="{SANS}" font-size="28" fill="{SLATE}">{escape(l)}</text>'
        for i, l in enumerate(subtitle_lines)
    )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="{NAVY}"/>
<rect x="0" y="0" width="12" height="630" fill="{GREEN}"/>
<text x="80" y="140" font-family="{MONO}" font-size="24" fill="{GREEN}">{escape(kicker)}</text>
<text x="80" y="260" font-family="{SANS}" font-size="92" font-weight="700" fill="{LIGHTEST_SLATE}">{escape(title)}</text>
{lines}
<text x="80" y="560" font-family="{MONO}" font-size="22" fill="{LIGHT_SLATE}">{escape(footer)}</text>
</svg>'''


OG_IMAGES = {
    'helios': og(
        'Case study · Healthcare translation operations',
        'Helios',
        ['Runs medical translation projects end to end —', 'intake, vendors, delivery, and invoicing.'],
        'Bijay Subedi · Rails 7 · React · Sidekiq · AWS S3',
    ),
    'quoting': og(
        'Case study · Healthcare localization',
        'Quoting',
        ['Turns translation requests into accurate,', 'versioned price quotes.'],
        'Bijay Subedi · Rails 7 · React 18 · PostgreSQL · ActionCable',
    ),
    'alistengine': og(
        'Case study · AI e-commerce automation',
        'AListEngine',
        ['Turns product photos into ready-to-publish', 'listings in minutes, not hours.'],
        'Bijay Subedi · Rails · React · AI vision · Shopify',
    ),
}


def main():
    for name, svg in DIAGRAMS.items():
        folder = os.path.join(ROOT, 'content', 'featured', name)
        svg_path = os.path.join(folder, 'architecture.svg')
        with open(svg_path, 'w') as f:
            f.write(svg)
        render(svg_path, os.path.join(folder, 'architecture.png'), W, H)
        print('diagram', name)

    og_dir = os.path.join(ROOT, 'static', 'og')
    os.makedirs(og_dir, exist_ok=True)
    for slug, svg in OG_IMAGES.items():
        svg_path = os.path.join(og_dir, f'{slug}.svg')
        with open(svg_path, 'w') as f:
            f.write(svg)
        render(svg_path, os.path.join(og_dir, f'{slug}.png'), 1200, 630)
        os.remove(svg_path)
        print('og', slug)


if __name__ == '__main__':
    main()
