export type RecordFields = {
  name: string
  address: string
  phone: string
  plate: string
}

export type DispatchService = 'Police' | 'Fire' | 'EMS' | 'Utility'
export type TrainingDifficulty = 'easy' | 'normal' | 'hard'

export const difficultySettings: Record<TrainingDifficulty, { label: string; memoryLength: number; memoryDuration: number; audioRate: number; interruptionDelay: number }> = {
  easy: { label: 'Easy', memoryLength: 5, memoryDuration: 5000, audioRate: 0.72, interruptionDelay: 11000 },
  normal: { label: 'Normal', memoryLength: 6, memoryDuration: 3500, audioRate: 0.88, interruptionDelay: 7000 },
  hard: { label: 'Hard', memoryLength: 8, memoryDuration: 2200, audioRate: 1.04, interruptionDelay: 4500 },
}

export type DecisionScenario = {
  prompt: string
  answer: DispatchService
}

export type PressureScenario = {
  record: RecordFields
  interruption: DecisionScenario
}

export type CallSummaryScenario = {
  record: RecordFields
  statement: string
  facts: Array<{ label: string; keywords: string[] }>
}

const firstNames = ['Avery', 'Theo', 'Nora', 'Keira', 'Jordan', 'Maya', 'Elliot', 'Sofia', 'Miles', 'Riley']
const lastNames = ['Collins', 'Bennett', 'Patel', 'Lewis', 'Morgan', 'Rivera', 'Turner', 'Nguyen', 'Foster', 'Brooks']
const streetNames = ['Harbor', 'Maple', 'Willow', 'Ridge', 'Pine', 'Cedar', 'Oak', 'Jefferson', 'Meadow', 'Summit']
const streetTypes = ['Road', 'Court', 'Avenue', 'Drive', 'Street', 'Lane']
const directions = ['North', 'South', 'East', 'West']
const plateLetters = 'ABCDEFGHJKLMNPRSTUVWXYZ'
const memoryCharacters = 'ABCDEFGHJKLMNPRSTUVWXYZ23456789'

const decisionScenarios: DecisionScenario[] = [
  { prompt: 'A person is threatening a neighbor with a metal pipe outside an apartment building. Which service receives it?', answer: 'Police' },
  { prompt: 'Someone is breaking vehicle windows in a parking lot. Which service receives it?', answer: 'Police' },
  { prompt: 'A caller reports a person trying to force open a locked front door. Which service receives it?', answer: 'Police' },
  { prompt: 'Two people are fighting outside a restaurant and one has been struck. Which service receives it?', answer: 'Police' },
  { prompt: 'A person is taking packages from a neighbor’s porch. Which service receives it?', answer: 'Police' },
  { prompt: 'Someone is following a resident through a parking garage and refusing to leave. Which service receives it?', answer: 'Police' },
  { prompt: 'A driver is intentionally damaging parked cars with their vehicle. Which service receives it?', answer: 'Police' },
  { prompt: 'A caller says a person is yelling threats while holding a baseball bat. Which service receives it?', answer: 'Police' },
  { prompt: 'A store employee reports an active shoplifting suspect refusing to leave. Which service receives it?', answer: 'Police' },
  { prompt: 'A person is seen spray-painting the side of a business after hours. Which service receives it?', answer: 'Police' },
  { prompt: 'A caller reports someone trying to steal a bicycle from a locked rack. Which service receives it?', answer: 'Police' },
  { prompt: 'A neighbor reports loud crashing and a person forcing entry into an occupied home. Which service receives it?', answer: 'Police' },
  { prompt: 'A person is threatening to damage a customer’s car during an argument. Which service receives it?', answer: 'Police' },
  { prompt: 'Someone has intentionally knocked over a street vendor’s display and is threatening staff. Which service receives it?', answer: 'Police' },
  { prompt: 'A caller sees a person attempting to remove a catalytic converter from a vehicle. Which service receives it?', answer: 'Police' },
  { prompt: 'Flames are visible from a vehicle in a parking lot. Which service receives it?', answer: 'Fire' },
  { prompt: 'Smoke is coming from a kitchen window in a residence. Which service receives it?', answer: 'Fire' },
  { prompt: 'A caller reports a trash bin fire spreading toward a fence. Which service receives it?', answer: 'Fire' },
  { prompt: 'There is a strong smell of smoke and an alarm sounding in an office building. Which service receives it?', answer: 'Fire' },
  { prompt: 'A small brush fire is moving toward a row of garages. Which service receives it?', answer: 'Fire' },
  { prompt: 'Sparks and smoke are coming from an electrical panel in a store. Which service receives it?', answer: 'Fire' },
  { prompt: 'A caller reports flames on a stove that will not go out. Which service receives it?', answer: 'Fire' },
  { prompt: 'Smoke is filling a hallway and a resident may be unable to leave an apartment. Which service receives it?', answer: 'Fire' },
  { prompt: 'A vehicle has struck a hydrant and smoke is coming from its engine. Which service receives it?', answer: 'Fire' },
  { prompt: 'A shed behind a home is on fire. Which service receives it?', answer: 'Fire' },
  { prompt: 'A caller sees flames under the hood of a delivery truck. Which service receives it?', answer: 'Fire' },
  { prompt: 'A fire alarm is sounding and smoke is visible from a hotel laundry room. Which service receives it?', answer: 'Fire' },
  { prompt: 'A grill fire has spread to the wooden deck of a house. Which service receives it?', answer: 'Fire' },
  { prompt: 'A dumpster is burning next to a retail building. Which service receives it?', answer: 'Fire' },
  { prompt: 'A caller reports a person trapped in an elevator with smoke entering the car. Which service receives it?', answer: 'Fire' },
  { prompt: 'A caller reports chest pain and trouble breathing. Which service receives it?', answer: 'EMS' },
  { prompt: 'A caller says a person is unconscious but breathing. Which service receives it?', answer: 'EMS' },
  { prompt: 'A person has fainted at a grocery store and is not responding normally. Which service receives it?', answer: 'EMS' },
  { prompt: 'A caller reports severe bleeding from a cut that will not stop. Which service receives it?', answer: 'EMS' },
  { prompt: 'A child is having trouble breathing after an allergic reaction. Which service receives it?', answer: 'EMS' },
  { prompt: 'A person has fallen down stairs and cannot stand. Which service receives it?', answer: 'EMS' },
  { prompt: 'A caller reports signs of a possible stroke, including sudden facial weakness. Which service receives it?', answer: 'EMS' },
  { prompt: 'A person is having a seizure in a public park. Which service receives it?', answer: 'EMS' },
  { prompt: 'A caller reports a person who may have overdosed and is difficult to wake. Which service receives it?', answer: 'EMS' },
  { prompt: 'A cyclist was hit by a vehicle and reports severe leg pain. Which service receives it?', answer: 'EMS' },
  { prompt: 'A person has been burned by hot oil and has blistering on their arm. Which service receives it?', answer: 'EMS' },
  { prompt: 'A caller reports severe abdominal pain and dizziness. Which service receives it?', answer: 'EMS' },
  { prompt: 'An elderly person is confused after a fall and has a head injury. Which service receives it?', answer: 'EMS' },
  { prompt: 'A person is choking and cannot speak. Which service receives it?', answer: 'EMS' },
  { prompt: 'A caller reports a person with diabetes who is sweating and disoriented. Which service receives it?', answer: 'EMS' },
  { prompt: 'A strong gas odor is coming from a damaged line near a home. Which service receives it?', answer: 'Utility' },
  { prompt: 'A traffic signal is dark at a busy intersection. Which service receives it?', answer: 'Utility' },
  { prompt: 'A broken water main is flooding the sidewalk and street. Which service receives it?', answer: 'Utility' },
  { prompt: 'A downed power line is sparking after a storm. Which service receives it?', answer: 'Utility' },
  { prompt: 'A caller reports a sewer cover overflowing onto a roadway. Which service receives it?', answer: 'Utility' },
  { prompt: 'Several streetlights are out near a dark crosswalk. Which service receives it?', answer: 'Utility' },
  { prompt: 'A gas meter has been struck and is making a loud hissing sound. Which service receives it?', answer: 'Utility' },
  { prompt: 'A traffic signal is flashing incorrectly in all directions. Which service receives it?', answer: 'Utility' },
  { prompt: 'A large tree has pulled down a neighborhood power line. Which service receives it?', answer: 'Utility' },
  { prompt: 'Water is pouring from a broken public hydrant. Which service receives it?', answer: 'Utility' },
  { prompt: 'A caller reports a manhole cover has shifted into the travel lane. Which service receives it?', answer: 'Utility' },
  { prompt: 'A utility pole is leaning into a roadway after a vehicle collision. Which service receives it?', answer: 'Utility' },
  { prompt: 'A water service line is leaking heavily from the sidewalk. Which service receives it?', answer: 'Utility' },
  { prompt: 'A public streetlight is hanging low over a lane of traffic. Which service receives it?', answer: 'Utility' },
  { prompt: 'A caller smells gas near an outdoor utility box. Which service receives it?', answer: 'Utility' },
]

const summaryIncidents = [
  { detail: 'smoke coming from a kitchen outlet', keywords: ['smoke', 'kitchen'] },
  { detail: 'a person who is unconscious but breathing', keywords: ['unconscious', 'breathing'] },
  { detail: 'someone breaking vehicle windows in a parking lot', keywords: ['breaking', 'windows'] },
  { detail: 'a strong gas odor near a damaged line', keywords: ['gas', 'line'] },
  { detail: 'a person with chest pain and shortness of breath', keywords: ['chest', 'breath'] },
  { detail: 'flames under the hood of a parked vehicle', keywords: ['flames', 'vehicle'] },
  { detail: 'a driver striking parked cars on purpose', keywords: ['striking', 'cars'] },
  { detail: 'a broken water main flooding the road', keywords: ['water', 'flooding'] },
  { detail: 'a person having a seizure near a bus stop', keywords: ['seizure', 'bus'] },
  { detail: 'a trash bin fire moving toward a fence', keywords: ['fire', 'fence'] },
  { detail: 'a person trying to force open a front door', keywords: ['force', 'door'] },
  { detail: 'a traffic signal dark at a busy intersection', keywords: ['signal', 'dark'] },
  { detail: 'a caller with severe bleeding from their arm', keywords: ['bleeding', 'arm'] },
  { detail: 'smoke filling the hallway of an apartment building', keywords: ['smoke', 'hallway'] },
  { detail: 'someone threatening a neighbor with a bat', keywords: ['threatening', 'bat'] },
  { detail: 'a downed power line sparking near the curb', keywords: ['power', 'sparking'] },
]

const summaryDistractors = [
  'The caller says their phone battery is low.',
  'A dog is barking nearby, but it is not involved.',
  'The caller first noticed the problem a few minutes ago.',
  'The weather outside is rainy and windy.',
  'The caller is standing near a blue mailbox.',
]

const typingPassages = [
  'Stay calm, listen closely, and enter each detail exactly as it is given. Clear information helps the right response reach the right place without delay.',
  'A strong dispatcher practice routine builds focus under pressure. Read the prompt once, keep your hands steady, and confirm important names, locations, and numbers.',
  'Accuracy comes before speed. Type at a pace you can control, notice each word, and recover quickly if you make a mistake instead of rushing ahead.',
  'During a busy shift, small details can matter. Practice keeping your attention on the current call while recording the information another person needs to act.',
  'Good communication is direct and complete. Use the facts you have, avoid guessing, and make each entry easy for the next person to understand.',
  'Pressure changes quickly, but a reliable process stays useful. Listen, verify the essentials, choose the next step, and keep moving with purpose.',
]

function randomInt(max: number, random: () => number) {
  return Math.floor(random() * max)
}

function choose<T>(items: T[], random: () => number) {
  return items[randomInt(items.length, random)]
}

function digits(length: number, random: () => number) {
  return Array.from({ length }, () => randomInt(10, random)).join('')
}

function characters(length: number, source: string, random: () => number) {
  return Array.from({ length }, () => source[randomInt(source.length, random)]).join('')
}

export function generateDataEntryScenario(difficulty: TrainingDifficulty = 'normal', random = Math.random): RecordFields {
  const houseNumber = String(randomInt(difficulty === 'easy' ? 899 : 8999, random) + 100)
  const unit = difficulty === 'hard' || (difficulty === 'normal' && random() > 0.65) ? `, Apt ${randomInt(9, random) + 1}${choose(['A', 'B', 'C'], random)}` : ''

  return {
    name: `${choose(firstNames, random)} ${choose(lastNames, random)}`,
    address: `${houseNumber} ${choose(directions, random)} ${choose(streetNames, random)} ${choose(streetTypes, random)}${unit}`,
    phone: `555-${digits(3, random)}-${digits(4, random)}`,
    plate: `${randomInt(9, random) + 1}${characters(2, plateLetters, random)}${digits(2, random)}${characters(1, plateLetters, random)}`,
  }
}

export function generateMemoryCode(difficulty: TrainingDifficulty = 'normal', random = Math.random) {
  return characters(difficultySettings[difficulty].memoryLength, memoryCharacters, random)
}

export function generateDecisionScenario(random = Math.random): DecisionScenario {
  return choose(decisionScenarios, random)
}

export function generatePressureScenario(difficulty: TrainingDifficulty = 'normal', random = Math.random): PressureScenario {
  return {
    record: generateDataEntryScenario(difficulty, random),
    interruption: generateDecisionScenario(random),
  }
}

export function recordToAudioScript(record: RecordFields) {
  const phone = record.phone.replace(/\d+/g, (digits) => digits.split('').join(', ')).replace(/-/g, ', ')
  const plate = record.plate.split('').join(' ')
  const address = record.address.replace(/\d+/g, (digits) => digits.split('').join(', '))
  return `My name is ${record.name}. I am at ${address}. My callback number is ${phone}. The vehicle plate is ${plate}.`
}

export function generateCallSummaryScenario(difficulty: TrainingDifficulty = 'normal', random = Math.random): CallSummaryScenario {
  const record = generateDataEntryScenario(difficulty, random)
  const incident = choose(summaryIncidents, random)
  const distractor = choose(summaryDistractors, random)
  const statements = [
    `${record.name} reports ${incident.detail} at ${record.address}. The caller can be reached at ${record.phone}. The vehicle plate mentioned is ${record.plate}. ${distractor}`,
    `At ${record.address}, ${record.name} says there is ${incident.detail}. ${distractor} Callback is ${record.phone}; the associated plate is ${record.plate}.`,
    `${distractor} ${record.name} is calling from ${record.address} about ${incident.detail}. Plate ${record.plate}. Return number: ${record.phone}.`,
    `Callback ${record.phone}. The caller, ${record.name}, reports ${incident.detail} at ${record.address}. ${distractor} Vehicle plate: ${record.plate}.`,
  ]

  return {
    record,
    statement: choose(statements, random),
    facts: [
      { label: 'Incident detail', keywords: incident.keywords },
      { label: 'Location', keywords: record.address.split(' ').slice(1, 3).map((word) => word.toLowerCase()) },
      { label: 'Callback number', keywords: [record.phone.replace(/\D/g, '')] },
      { label: 'Vehicle plate', keywords: [record.plate.toLowerCase()] },
    ].slice(0, difficulty === 'easy' ? 2 : difficulty === 'normal' ? 3 : 4),
  }
}

export function generateTypingPassage(random = Math.random) {
  return choose(typingPassages, random)
}

export const copyEntryFields = ['firstName', 'lastName', 'phone', 'address', 'city', 'zip', 'vin', 'plate', 'license'] as const

export type CopyEntryField = (typeof copyEntryFields)[number]

export const copyEntryLabels: Record<CopyEntryField, string> = {
  firstName: 'First name',
  lastName: 'Last name',
  phone: 'Phone',
  address: 'Street address',
  city: 'City',
  zip: 'ZIP',
  vin: 'VIN',
  plate: 'Plate',
  license: "Driver's license",
}

export type CopyEntryRecord = Record<CopyEntryField, string>

export type CopyEntryRound = {
  record: CopyEntryRecord
  requested: CopyEntryField[]
}

export type CopyEntryFieldStatus = 'correct' | 'incorrect' | 'extra' | 'blank'

export type CopyEntryGrade = {
  score: number
  fields: Array<{ key: CopyEntryField; status: CopyEntryFieldStatus; expected: string }>
}

const copyFirstNames = ['Avery', 'Blake', 'Cameron', 'Devon', 'Ellis', 'Finley', 'Gray', 'Harper', 'Indigo', 'Jules', 'Kendall', 'Logan', 'Marlow', 'Nico', 'Oakley', 'Parker', 'Quinn', 'Reese', 'Sawyer', 'Tatum', 'Uma', 'Val', 'Winter', 'Yael', 'Arden', 'Briar', 'Casey', 'Drew', 'Emery', 'Frankie']
const copyLastNames = ['Adler', 'Brooks', 'Cho', 'Dalton', 'Ellison', 'Foster', 'Garcia', 'Holt', 'Ibarra', 'Jensen', 'Keller', 'Lang', 'Morales', 'Nguyen', 'Okada', 'Patel', 'Quincy', 'Rowe', 'Shah', 'Tran', 'Ueda', 'Voss', 'Walsh', 'Young', 'Zimmer', 'Brennan', 'Carter', 'Diaz', 'Ellis', 'Frost']
const copyStreets = ['Harbor', 'Maple', 'Willow', 'Ridge', 'Pine', 'Cedar', 'Oak', 'Jefferson', 'Meadow', 'Summit', 'Birch', 'Cinder', 'Dover', 'Elm', 'Fulton', 'Grant', 'Highland', 'Ivy', 'Juniper', 'Keeler', 'Lark', 'Mercer']
const copyCities = ['Ashford', 'Bayview', 'Cedar Falls', 'Dover', 'Easton', 'Fairview', 'Glenwood', 'Harbor City', 'Irving', 'Jasper', 'Kingsport', 'Lakewood', 'Midvale', 'Northfield', 'Oakridge', 'Pinehurst', 'Redwood', 'Silverton', 'Westbrook', 'York']
const vinCharacters = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789'
const plateLettersWithConfusables = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function normalizeCopyEntry(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export function copyEntryInstruction(requested: CopyEntryField[]) {
  if (requested.length === copyEntryFields.length) return 'Enter every field.'
  const names = requested.map((key) => copyEntryLabels[key])
  if (names.length === 1) return `Enter only: ${names[0]}.`
  if (names.length === 2) return `Enter only: ${names[0]} and ${names[1]}.`
  return `Enter only: ${names.slice(0, -1).join(', ')}, and ${names.at(-1)}.`
}

export function scoreCopyEntry(round: CopyEntryRound, response: CopyEntryRecord): CopyEntryGrade {
  const requested = new Set(round.requested)
  const fields = copyEntryFields.map((key) => {
    const expected = round.record[key]
    const filled = response[key].trim().length > 0
    const matches = normalizeCopyEntry(response[key]) === normalizeCopyEntry(expected) && normalizeCopyEntry(expected).length > 0
    const status: CopyEntryFieldStatus = requested.has(key) ? (matches ? 'correct' : 'incorrect') : filled ? 'extra' : 'blank'
    return { key, status, expected }
  })
  const correct = fields.filter((field) => field.status === 'correct').length
  const extras = fields.filter((field) => field.status === 'extra').length
  const denominator = round.requested.length + extras
  return { score: denominator === 0 ? 0 : Math.round((correct / denominator) * 100), fields }
}

function generateConfusablePlate(random: () => number) {
  const patterns = [
    () => `${characters(3, plateLettersWithConfusables, random)}${digits(4, random)}`,
    () => `${digits(1, random)}${characters(3, plateLettersWithConfusables, random)}${digits(3, random)}`,
    () => `${characters(2, plateLettersWithConfusables, random)}${digits(2, random)}${characters(2, plateLettersWithConfusables, random)}`,
    () => `${digits(3, random)}${characters(3, plateLettersWithConfusables, random)}`,
  ]
  const plate = choose(patterns, random)().split('')
  const letterSlots = plate.map((character, index) => (/[A-Z]/.test(character) ? index : -1)).filter((index) => index >= 0)
  const digitSlots = plate.map((character, index) => (/[0-9]/.test(character) ? index : -1)).filter((index) => index >= 0)
  if (!plate.some((character) => character === 'O' || character === 'I') && letterSlots.length) plate[choose(letterSlots, random)] = random() > 0.5 ? 'O' : 'I'
  if (!plate.some((character) => character === '0' || character === '1') && digitSlots.length) plate[choose(digitSlots, random)] = random() > 0.5 ? '0' : '1'
  return plate.join('')
}

function generatePracticeLicense(random: () => number) {
  const patterns = [
    () => `${characters(1, plateLettersWithConfusables, random)}${digits(7, random)}`,
    () => `${digits(1, random)}${characters(2, plateLettersWithConfusables, random)}${digits(6, random)}`,
    () => `${characters(2, plateLettersWithConfusables, random)}${digits(6, random)}`,
  ]
  return choose(patterns, random)()
}

function chooseCopyEntryFields(random: () => number) {
  if (random() < 0.22) return [...copyEntryFields]
  const count = 2 + randomInt(3, random)
  const pool = [...copyEntryFields]
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swap = randomInt(index + 1, random)
    const current = pool[index]
    pool[index] = pool[swap]
    pool[swap] = current
  }
  const picked = new Set(pool.slice(0, count))
  return copyEntryFields.filter((key) => picked.has(key))
}

export function generateCopyEntryRound(random = Math.random): CopyEntryRound {
  const houseNumber = String(randomInt(9000, random) + 100)
  const unit = random() > 0.55 ? ` APT ${randomInt(9, random) + 1}${choose(['A', 'B', 'C'], random)}` : ''
  const record: CopyEntryRecord = {
    firstName: choose(copyFirstNames, random).toUpperCase(),
    lastName: choose(copyLastNames, random).toUpperCase(),
    phone: `555-${digits(3, random)}-${digits(4, random)}`,
    address: `${houseNumber} ${choose(directions, random).toUpperCase()} ${choose(copyStreets, random).toUpperCase()} ${choose(streetTypes, random).toUpperCase()}${unit}`,
    city: choose(copyCities, random).toUpperCase(),
    zip: digits(5, random),
    vin: characters(17, vinCharacters, random),
    plate: generateConfusablePlate(random),
    license: generatePracticeLicense(random),
  }

  return { record, requested: chooseCopyEntryFields(random) }
}
