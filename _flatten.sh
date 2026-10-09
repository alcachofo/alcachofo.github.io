#!/usr/bin/env bash
# Post-build: English-only static site served at root (no /en prefix).
# The app lives under src/app/[locale], so Next always emits pages under out/en/.
# This mirrors them to the root so links like /about resolve on a plain static host.
set -e
cd "$(dirname "$0")"
# Drop non-English locale outputs (content is English-only).
for l in es ja zh-CN zh-TW pt-BR; do
  rm -rf "out/$l" "out/$l.html" "out/$l.txt"
done
# Mirror English pages + RSC data up to the root.
cp -r out/en/. out/
# Homepage at root.
cp out/en.html out/index.html
[ -f out/en.txt ] && cp out/en.txt out/index.txt || true
# Next writes the per-segment prefetch files as nested folders (a/__next.$d$locale/!KG1haW4p/blog.txt),
# but the browser asks for the same file with dots instead of slashes (a/__next.$d$locale.!KG1haW4p.blog.txt).
# Without a server to rewrite that, every prefetch 404s, so each nested file also gets its dotted twin.
find out -path '*/__next.*/*' -name '*.txt' | while read -r f; do
  # base is the page folder that owns the __next.* tree, i.e. everything before "/__next.".
  base="${f%%/__next.*}"
  # rel is the nested part, starting at "__next.".
  rel="${f#"$base"/}"
  # Swapping every "/" in rel for "." gives the exact name the client requests.
  cp "$f" "$base/${rel//\//.}"
done
echo "flatten: done"
