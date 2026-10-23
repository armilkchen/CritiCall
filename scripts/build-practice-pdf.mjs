import { mkdirSync, writeFileSync } from 'node:fs'

const pages = [
  {
    title: 'DispatchReady practice sheet',
    lines: [
      'Original practice. Not a CritiCall or Biddle Consulting Group form.',
      'Copy every character. One wrong character misses the field.',
      'Phone dashes are optional. Plates are not.',
      '',
      'Record 1',
      'Name: Jordan Hale',
      'Address: 418 West Cedar Lane',
      'Phone: 555-014-2281',
      'Plate: 7KLM241',
      'Name: ____________________',
      'Address: ____________________',
      'Phone: ____________________',
      'Plate: ____________________',
      '',
      'Record 2',
      'Name: Riley Nguyen',
      'Address: 902 North Harbor Court Apt 3B',
      'Phone: 555-013-7740',
      'Plate: 4QRS908',
      'Name: ____________________',
      'Address: ____________________',
      'Phone: ____________________',
      'Plate: ____________________',
      '',
      'Record 3',
      'Name: Avery Brooks',
      'Address: 1550 East Willow Drive',
      'Phone: 555-016-4402',
      'Plate: 2MNP661',
      'Name: ____________________',
      'Address: ____________________',
      'Phone: ____________________',
      'Plate: ____________________',
    ],
  },
  {
    title: 'Codes and decisions',
    lines: [
      'Look at each code for about 4 seconds, cover it, then write it.',
      'A code counts only when all 6 characters match.',
      '',
      'Code 1: R7M4Q2     Your answer: __________',
      'Code 2: K3P8L5     Your answer: __________',
      'Code 3: H6N2W9     Your answer: __________',
      'Code 4: T4C7D1     Your answer: __________',
      '',
      'Rule for this sheet only:',
      'Threats and property damage -> Police',
      'Flames or smoke -> Fire',
      'Injury or a medical symptom -> EMS',
      'Damaged public service -> Utility',
      '',
      '1. A person is striking parked cars with a bat.',
      '   Service: __________',
      '2. Smoke is coming from a kitchen window.',
      '   Service: __________',
      '3. A caller reports chest pain and trouble breathing.',
      '   Service: __________',
      '4. A traffic signal is dark at a busy corner.',
      '   Service: __________',
      '5. A caller sees flames under the hood of a truck.',
      '   Service: __________',
      '6. A broken water main is flooding the street.',
      '   Service: __________',
    ],
  },
  {
    title: 'Answer key and scoring',
    lines: [
      'Entry: 1 point per exact field. 3 records x 4 fields = 12.',
      'Jordan Hale | 418 West Cedar Lane | 555-014-2281 | 7KLM241',
      'Riley Nguyen | 902 North Harbor Court Apt 3B | 555-013-7740 | 4QRS908',
      'Avery Brooks | 1550 East Willow Drive | 555-016-4402 | 2MNP661',
      'Same phone digits with or without dashes still count.',
      '',
      'Memory: 1 point only for an exact code. 4 points possible.',
      'R7M4Q2   K3P8L5   H6N2W9   T4C7D1',
      '',
      'Decisions: 1 point each. 6 points possible.',
      '1 Police   2 Fire   3 EMS   4 Utility   5 Fire   6 Utility',
      '',
      'Total possible: 22.',
      'A clean practice sheet is 18 or higher, with no missed plate.',
      'That target applies only to this file. It is not a hiring cutoff.',
      '',
      'This sheet cannot play a caller, hide a code on a timer,',
      'or measure the points you lose when a second task interrupts',
      'a form. For that gap, use the online multitasking drill at',
      'https://dispatchready.org/criticall-multitasking-test',
    ],
  },
]

function escapePdf(text) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function streamFor(page) {
  const commands = ['BT', '/F1 16 Tf', '54 740 Td', `(${escapePdf(page.title)}) Tj`, '/F1 11 Tf', '14 TL', '0 -28 Td']
  for (const line of page.lines) {
    commands.push(`(${escapePdf(line)}) Tj`, 'T*')
  }
  commands.push('ET')
  return commands.join('\n')
}

const objects = []
function addObject(body) {
  objects.push(body)
  return objects.length
}

const fontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')
const pageIds = []
const contentIds = []
for (const page of pages) {
  const stream = streamFor(page)
  const contentId = addObject(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`)
  contentIds.push(contentId)
  const pageId = addObject(`<< /Type /Page /Parent PAGES_ID 0 R /MediaBox [0 0 612 792] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontId} 0 R >> >> >>`)
  pageIds.push(pageId)
}
const pagesId = addObject(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`)
const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`)
objects[pageIds[0] - 1] = objects[pageIds[0] - 1].replaceAll('PAGES_ID', String(pagesId))
for (const pageId of pageIds.slice(1)) {
  objects[pageId - 1] = objects[pageId - 1].replaceAll('PAGES_ID', String(pagesId))
}

let pdf = '%PDF-1.4\n'
const offsets = [0]
for (let index = 0; index < objects.length; index += 1) {
  offsets.push(Buffer.byteLength(pdf))
  pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`
}
const xref = Buffer.byteLength(pdf)
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'
for (let index = 1; index < offsets.length; index += 1) {
  pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer << /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`
mkdirSync(new URL('../public/downloads/', import.meta.url), { recursive: true })
writeFileSync(new URL('../public/downloads/criticall-practice-test.pdf', import.meta.url), pdf)
console.log(`wrote ${pdf.length} bytes, root ${catalogId}, pages ${pagesId}`)
