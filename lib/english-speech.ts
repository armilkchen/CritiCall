type SpeechCallbacks = {
  onStart?: () => void
  onEnd?: () => void
  onError?: () => void
}

export function speakEnglish(text: string, rate: number, callbacks: SpeechCallbacks = {}) {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return false

  const voice = window.speechSynthesis.getVoices().find((candidate) => candidate.lang.toLowerCase().startsWith('en-us'))
    ?? window.speechSynthesis.getVoices().find((candidate) => candidate.lang.toLowerCase().startsWith('en-'))

  if (!voice) return false

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = voice.lang
  utterance.voice = voice
  utterance.rate = rate
  utterance.onstart = callbacks.onStart ?? null
  utterance.onend = callbacks.onEnd ?? null
  utterance.onerror = callbacks.onError ?? null
  window.speechSynthesis.speak(utterance)
  return true
}
