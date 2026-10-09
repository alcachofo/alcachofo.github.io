'use client'

import { useEffect } from 'react'

export function Hello() {
  // Runs once after the page mounts, which is the moment someone with devtools open would see it.
  useEffect(() => {
    // A greeting in the console for whoever opens devtools, pointing at the repo instead of the old author's.
    console.log(
      `\
%cHey, you opened devtools. Respect.

No flag here, this artichoke only has leaves.
The whole site is open source:

https://github.com/alcachofo/alcachofo.github.io
`,
      // %c in the text above picks up this style, so the message prints large and in artichoke green.
      'font-size: 16px; color: #a3e635',
    )
  }, [])

  // Nothing to render: this component only exists for the console message.
  return null
}
