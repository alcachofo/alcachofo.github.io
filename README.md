# alcachofo.github.io

My site: CTF writeups, projects and anything else worth peeling open. Live at **https://alcachofo.github.io**.

A static Next.js site (Next 16, Tailwind, MDX) built and deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every push to `main`.

## Adding a writeup

1. Create `src/content/blog/en/<slug>.mdx`. The slug becomes the URL: `/blog/<slug>`.
2. Start it with this header, then write normal Markdown below it:

   ```mdx
   ---
   title: "Challenge name"
   description: "One or two sentences for the post card and link previews."
   date: 2026-10-09T12:00:00.000Z
   ctf: "Some CTF 2026"
   category: "Pwn"
   ---
   ```

3. Push. The build draws the cover (`public/images/blog/<slug>/cover.png`) by itself. To use your own cover instead, put a 1200x630 `cover.png` there and it will be left alone.

MDX gotcha: outside code blocks, `{`, `}` and `<` mean JavaScript and JSX. Write `\{`, `\}` and `\<`, or wrap the text in backticks (`` `flag{...}` ``).

Projects work the same way in `src/content/projects/en/` (see the existing ones for the header fields; `selected: true` puts a project on the home page).

## Running it locally

Needs [bun](https://bun.sh) and Node 24.

```bash
bun install
bun dev            # http://localhost:3000/en
bun run build      # full static build into out/
```

## Where things live

| What | Where |
| --- | --- |
| Name, profile links, repo URL | `src/constants/site.ts` |
| Home page text (hero, location) | `src/i18n/messages/en.json` under `homepage` |
| About page | `src/content/pages/en/about.mdx` |
| Colours | `src/styles/globals.css` (`.dark` block) and `src/components/gradient-background.tsx` |
| Cover generator | `scripts/covers.mjs` |

## Credits

- Code: based on [nelsonlai.dev](https://github.com/nelsonlaidev/nelsonlai.dev) by Nelson Lai, via [0xAdham](https://github.com/0xAdham1/0xAdham1.github.io)'s static GitHub Pages version. MIT, see `LICENSE`.
- Artichoke photos:
  - [Artichoke J1](https://commons.wikimedia.org/wiki/File:Artichoke_J1.jpg) by Jamain, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The cutouts and crops made from it (`public/images/artichoke.png`, `public/images/avatar.png`, the favicons and app icons, and the artichoke on the covers) are shared under the same license.
  - [Natural Beauty](https://commons.wikimedia.org/wiki/File:Natural_Beauty_(Unsplash).png) by Christine Siracusa, CC0 (`public/images/artichoke-side.png`).
