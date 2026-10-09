import { notFound } from 'next/navigation'

// GitHub Pages serves out/404.html for any unknown URL, but a static export only writes Next's plain
// default there. Prerendering this one catch-all path makes Next render the site's own not-found page
// (header, footer, artichoke) into en/404.html, which _flatten.sh then copies up to out/404.html.
export function generateStaticParams(): Array<{ rest: string[] }> {
  // One path is all that is needed: the file name has to be 404 so it lands as en/404.html.
  return [{ rest: ['404'] }]
}

// Every URL this route catches is unknown by definition, so it always hands over to not-found.tsx.
export default function CatchAll() {
  notFound()
}
