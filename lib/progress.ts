export type AssessmentResult = {
  id: string
  completedAt: string
  baselineScore: number
  pressureScore: number
  pressureDrop: number
  readiness: number
  risk: string
  decisionResponseSeconds: number | null
  decisionTimedOut: boolean
}

export type DrillType = 'entry' | 'typing' | 'memory' | 'audio' | 'summary' | 'pressure' | 'simulation' | 'exam'

export type DrillResult = {
  id: string
  completedAt: string
  drill: DrillType
  score: number
  difficulty?: 'easy' | 'normal' | 'hard'
  metrics?: {
    wpm: number
    accuracy: number
  }
}

export type ProgressData = {
  assessments: AssessmentResult[]
  drills: DrillResult[]
}

const STORAGE_KEY = 'dispatchready-progress-v1'
const EMPTY_PROGRESS: ProgressData = { assessments: [], drills: [] }

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function loadProgress(): ProgressData {
  if (typeof window === 'undefined') return EMPTY_PROGRESS

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return EMPTY_PROGRESS

    const parsed = JSON.parse(stored) as Partial<ProgressData>
    return {
      assessments: Array.isArray(parsed.assessments) ? parsed.assessments : [],
      drills: Array.isArray(parsed.drills) ? parsed.drills : [],
    }
  } catch {
    return EMPTY_PROGRESS
  }
}

function saveProgress(progress: ProgressData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function saveAssessmentResult(result: Omit<AssessmentResult, 'id' | 'completedAt'>) {
  const progress = loadProgress()
  const assessment: AssessmentResult = {
    ...result,
    id: createId(),
    completedAt: new Date().toISOString(),
  }

  saveProgress({
    ...progress,
    assessments: [assessment, ...progress.assessments].slice(0, 20),
  })

  return assessment
}

export function saveDrillResult(drill: DrillType, score: number, difficulty?: DrillResult['difficulty'], metrics?: DrillResult['metrics']) {
  const progress = loadProgress()
  const result: DrillResult = {
    id: createId(),
    completedAt: new Date().toISOString(),
    drill,
    score,
    difficulty,
    metrics,
  }

  saveProgress({
    ...progress,
    drills: [result, ...progress.drills].slice(0, 100),
  })

  return result
}

export function clearProgress() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}
