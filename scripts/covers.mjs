// Makes the 1200x630 cover image for every post and project that does not have one yet.
// It runs before every build (see "prebuild" in package.json), so a new writeup gets its cover for free.
// Covers that already exist are never touched, so a hand-made cover.png always wins.

// existsSync/mkdirSync/readdirSync/readFileSync/writeFileSync are the stdlib file helpers this needs.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
// ImageResponse is Next's own image renderer (satori + resvg), already installed with Next.
// The ".js" is needed because this is a plain Node script, not code going through the Next bundler.
import { ImageResponse } from 'next/og.js'
// createElement builds the element tree that satori lays out, so no JSX compiler is needed here.
import { createElement as h } from 'react'

// The same Geist font the site uses, read from disk so the covers look identical everywhere.
const regular = readFileSync('src/assets/fonts/Geist-Regular.ttf')
// The semibold cut is for the name and the big title.
const semibold = readFileSync('src/assets/fonts/Geist-SemiBold.ttf')
// The artichoke cutout goes in the bottom-right corner, where the original covers had the author photo.
// satori only takes images as data URLs or remote URLs, so it is inlined as base64.
const artichoke = `data:image/png;base64,${readFileSync('public/images/artichoke.png').toString('base64')}`

// Two collections get covers: blog posts and projects, each with its own source and output folder.
const COLLECTIONS = [
  { content: 'src/content/blog/en', images: 'public/images/blog', kind: 'post' },
  { content: 'src/content/projects/en', images: 'public/images/projects', kind: 'project' },
]

// Reads the YAML frontmatter at the top of an .mdx file into a plain object.
function frontmatter(file) {
  // The block between the first two "---" lines is the frontmatter, and if there is none, I return {}.
  const match = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) {
    return {}
  }
  const data = {}
  // Every "key: value" line becomes one entry.
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^(\w+):\s*(.*)$/)
    // A line that is not "key: value" (a blank one, say) is skipped.
    if (!pair) {
      continue
    }
    const value = pair[2].trim()
    // Values written as JSON (quoted strings, ["arrays"]) are parsed as JSON so quotes and escapes come out right.
    if (value.startsWith('"') || value.startsWith('[')) {
      data[pair[1]] = JSON.parse(value)
    } else {
      // Anything else is taken as plain text, with single quotes around it stripped.
      data[pair[1]] = value.replace(/^'(.*)'$/, '$1')
    }
  }
  return data
}

// Long titles get a smaller font so they still fit in the space above the footer.
function titleSize(title) {
  // Up to 24 characters fits at full size.
  if (title.length <= 24) {
    return 76
  }
  // Up to 40 still fits on two lines at a medium size.
  if (title.length <= 40) {
    return 62
  }
  // Anything longer drops to the smallest size.
  return 52
}

// Builds the cover for one item: label on top, big title, name and kind at the bottom, artichoke in the corner.
function cover({ label, title, footer }) {
  return h(
    'div',
    {
      style: {
        // The page is a column: the top block and the footer get pushed apart by space-between.
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '80px',
        // The site's green-black, with a soft green glow in the top-left corner like the site header.
        backgroundColor: '#090f0a',
        backgroundImage: 'radial-gradient(circle at 12% 0%, rgba(61, 190, 90, 0.22), transparent 55%)',
        color: '#f2f7ef',
        fontFamily: 'Geist',
      },
    },
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column' } },
      // The short bar above the label, in the site's lime.
      h('div', { style: { width: 56, height: 6, borderRadius: 3, backgroundColor: '#a3e635' } }),
      // The label: CTF name or "PROJECT", spaced out in capitals like the original covers.
      h(
        'div',
        { style: { marginTop: 28, fontSize: 30, fontWeight: 600, letterSpacing: 4, color: '#9fb59a' } },
        label.toUpperCase(),
      ),
      // The challenge or project name, as big as it can be while still fitting.
      h(
        'div',
        { style: { marginTop: 70, fontSize: titleSize(title), fontWeight: 600, lineHeight: 1.15, maxWidth: 1000 } },
        title,
      ),
    ),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' } },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', fontSize: 32 } },
        // The author name in semibold, then the kind of writeup in the dimmer green-grey.
        h('span', { style: { fontWeight: 600, color: '#d9e8d2' } }, 'Alcachofo'),
        h('span', { style: { marginLeft: 22, color: '#8fa58a' } }, `•  ${footer}`),
      ),
      // The artichoke sits in the corner, the same spot the original covers used for the author photo.
      h('img', { src: artichoke, width: 150, height: 150, style: { objectFit: 'contain' } }),
    ),
  )
}

// Counts how many covers this run created, just for the log line at the end.
let made = 0
for (const { content, images, kind } of COLLECTIONS) {
  // Every .mdx file in the collection folder is one post or project.
  for (const name of readdirSync(content)) {
    if (!name.endsWith('.mdx')) {
      continue
    }
    // The slug is the file name, which is also the folder name the site looks for the cover in.
    const slug = name.slice(0, -4)
    const target = `${images}/${slug}/cover.png`
    // If the cover is already there (generated earlier or made by hand), it stays as it is.
    if (existsSync(target)) {
      continue
    }
    const meta = frontmatter(`${content}/${name}`)
    let label = 'Project'
    let footer = (meta.techstack ?? []).join(', ') || 'Project'
    // Posts are labelled with their CTF (minus the "(INCIBE)" organiser note) and the challenge category.
    if (kind === 'post') {
      label = (meta.ctf ?? 'CTF').replace(/\s*\(INCIBE\)/, '')
      footer = `${meta.category ?? 'CTF'} writeup`
    }
    const image = new ImageResponse(cover({ label, title: meta.title ?? slug, footer }), {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Geist', data: regular, weight: 400 },
        { name: 'Geist', data: semibold, weight: 600 },
      ],
      // Titles like "🧅" or "☕" are drawn with Twemoji images instead of an emoji font.
      emoji: 'twemoji',
    })
    // The folder per slug matches the path the post and project cards request.
    mkdirSync(`${images}/${slug}`, { recursive: true })
    writeFileSync(target, Buffer.from(await image.arrayBuffer()))
    made += 1
  }
}
// The site banner (the link preview for pages without a cover, and the RSS image) uses the same layout,
// and like the covers it is only drawn when the file is missing.
if (!existsSync('public/images/banner.png')) {
  const banner = new ImageResponse(
    cover({ label: 'alcachofo.github.io', title: 'CTF writeups, peeled leaf by leaf', footer: 'CTF player & security researcher' }),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Geist', data: regular, weight: 400 },
        { name: 'Geist', data: semibold, weight: 600 },
      ],
    },
  )
  writeFileSync('public/images/banner.png', Buffer.from(await banner.arrayBuffer()))
  made += 1
}
console.log(`covers: ${made} new`)
