/* eslint-disable @next/next/no-img-element */

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'DispatchReady — 911 Dispatcher Test Prep'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logoData = await readFile(join(process.cwd(), 'public', 'images', 'dispatchready-logo.png'), 'base64')
  const logoSrc = `data:image/png;base64,${logoData}`

  return new ImageResponse(
    <div style={{ background: '#0f172a', color: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', padding: '72px 88px' }}>
      <img src={logoSrc} alt="" style={{ width: 250, height: 250, marginRight: 64 }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#93c5fd', fontSize: 26, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>Free dispatcher skills practice</div>
        <div style={{ fontSize: 78, fontWeight: 800, letterSpacing: -3, marginTop: 22 }}>DispatchReady</div>
        <div style={{ color: '#cbd5e1', fontSize: 32, marginTop: 26 }}>Train for the pressure of a 911 dispatcher hiring test.</div>
      </div>
    </div>,
    size,
  )
}
