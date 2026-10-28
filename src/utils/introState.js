// introState.js — Module-level flag to ensure intro only runs on initial page load
let introPlayed = false

export function isIntroPlayed() {
  return introPlayed
}

export function setIntroPlayed(val = true) {
  introPlayed = val
}
