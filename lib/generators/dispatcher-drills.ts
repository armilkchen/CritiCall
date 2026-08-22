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
  { prompt: 'Flames are visible from a vehicle in a parking lot. Which service receives it?', answer: 'Fire' },
  { prompt: 'A caller reports chest pain and trouble breathing. Which service receives it?', answer: 'EMS' },
  { prompt: 'A strong gas odor is coming from a damaged line near a home. Which service receives it?', answer: 'Utility' },
  { prompt: 'A traffic signal is dark at a busy intersection. Which service receives it?', answer: 'Utility' },
  { prompt: 'Smoke is coming from a kitchen window in a residence. Which service receives it?', answer: 'Fire' },
  { prompt: 'Someone is breaking car windows in a parking garage. Which service receives it?', answer: 'Police' },
  { prompt: 'A caller says a person is unconscious but breathing. Which service receives it?', answer: 'EMS' },
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
  const phone = record.phone.split('').map((character) => (character === '-' ? ', ' : character)).join(' ')
  const plate = record.plate.split('').join(' ')
  return `My name is ${record.name}. I am at ${record.address}. My callback number is ${phone}. The vehicle plate is ${plate}.`
}

export function generateCallSummaryScenario(difficulty: TrainingDifficulty = 'normal', random = Math.random): CallSummaryScenario {
  const record = generateDataEntryScenario(difficulty, random)
  const incident = choose([
    { detail: 'smoke coming from a kitchen outlet', keywords: ['smoke', 'kitchen'] },
    { detail: 'a person who is unconscious but breathing', keywords: ['unconscious', 'breathing'] },
    { detail: 'someone breaking vehicle windows in a parking lot', keywords: ['breaking', 'windows'] },
    { detail: 'a strong gas odor near a damaged line', keywords: ['gas', 'line'] },
  ], random)

  return {
    record,
    statement: `${record.name} reports ${incident.detail} at ${record.address}. The caller can be reached at ${record.phone}. The vehicle plate mentioned is ${record.plate}.`,
    facts: [
      { label: 'Incident detail', keywords: incident.keywords },
      { label: 'Location', keywords: record.address.split(' ').slice(1, 3).map((word) => word.toLowerCase()) },
      { label: 'Callback number', keywords: [record.phone.replace(/\D/g, '')] },
      { label: 'Vehicle plate', keywords: [record.plate.toLowerCase()] },
    ].slice(0, difficulty === 'easy' ? 2 : difficulty === 'normal' ? 3 : 4),
  }
}
