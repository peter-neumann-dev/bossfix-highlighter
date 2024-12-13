import './styles.css'

interface BossFixConfig {
  messages: string[]
  emojis: string[]
}

const BOSSFIX: BossFixConfig = {
  messages: [
    'Der Boss rettet wieder den Tag! 🎩',
    'Ohne BossFix läuft hier nix! 🚀',
    'Der Boss ist der echte Fixer! 🔧',
    'Wieder ein Projekt gerettet! 💪',
    'Boss-Mode aktiviert! 🎯',
    "Der Boss hat's wieder gerichtet! ⭐",
    'BossFix to the rescue! 🦸‍♂️',
    'Problemlöser #1 am Start! 🏆',
    'Chef-Qualität delivered! 💫',
    'Wenn Bossfix nicht hilft, hilft nichts mehr! 💼',
    'Wer braucht Superhelden, wenn es BossFix gibt? 🦸‍♂️',
    'Bug? Welcher Bug? BossFix ist da! 🔥',
    'Der Boss bringt Ordnung ins Chaos! 🎯',
    'Ein Commit wie kein anderer – BossFix approved! ✅',
    'Jeder BossFix – ein Treffer ins Schwarze. 🎯',
    'Der Boss höchstpersönlich hat sich drum gekümmert. 🤝',
    'Erneut bewiesen: BossFix > Hotfix! 🔧',
    'Selbst Bugs zittern vor BossFix. ❄️🐛',
    'BossFix: Debugging mit Stil. 😎',
    '„Boss-Faktor" aktiviert – Problem gelöst! 🛠️',
    'BossFix: Die Antwort auf alles. 🤔➡️✅',
    'Kein Bug ist sicher vor BossFix. 🕵️‍♂️🐛',
    'BossFix bringt den Glanz ins Repo! ✨',
    'Wo BossFix ist, ist Hoffnung. 🙌',
    'Jeder Commit ein Meisterwerk! 🎨',
  ],
  emojis: ['🚀', '🔥', '💥', '🚨', '🎩', '🪓'],
}

/** @type {WeakSet} Tracks processed DOM nodes */
const processedNodes = new WeakSet<Node>()
let isProcessing = false
let currentToast: HTMLDivElement | null = null
let toastTimeout: number | undefined = undefined
let hoverSound: HTMLAudioElement | null = null

/**
 * Initializes the hover sound effect
 */
function initializeSound(): void {
  hoverSound = new Audio(chrome.runtime.getURL('the-bossfix.mp3'))
  hoverSound.volume = 0.5
}

/** Shows toast notification with random message */
function showToast(): void {
  if (currentToast) return

  const toast = document.createElement('div')
  toast.className = 'bossfix-toast'
  toast.textContent =
    BOSSFIX.messages[Math.floor(Math.random() * BOSSFIX.messages.length)]
  document.body.appendChild(toast)
  currentToast = toast

  if (toastTimeout !== undefined) {
    clearTimeout(toastTimeout)
  }
  toastTimeout = window.setTimeout(() => {
    toast.remove()
    currentToast = null
    toastTimeout = undefined
  }, 3000)
}

/** Handles hover event with sound and toast */
function handleHover(): void {
  if (hoverSound) {
    hoverSound.currentTime = 0
    hoverSound.play().catch(console.warn)
  }
  showToast()
}

/**
 * Checks if a node should be processed for highlighting
 * @param {Node} node - DOM node to check
 */
function shouldProcessNode(node: Node): boolean {
  if (processedNodes.has(node)) return false
  if (
    node instanceof Element &&
    ['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'SVG'].includes(node.tagName)
  )
    return false
  if (
    node instanceof Element &&
    node.classList &&
    Array.from(node.classList).some((cls) =>
      ['bossfix-highlighted', 'bossfix-toast', 'monaco-editor'].includes(cls),
    )
  )
    return false
  return true
}

/**
 * Creates a highlighted span for matched text
 * @param {string} match - Text to highlight
 */
function createHighlight(match: string): HTMLSpanElement {
  const span = document.createElement('span')
  span.className = 'bossfix-highlighted'
  span.textContent = match

  const emoji = document.createElement('span')
  emoji.className = 'boss-emoji'
  emoji.textContent =
    BOSSFIX.emojis[Math.floor(Math.random() * BOSSFIX.emojis.length)]

  span.appendChild(emoji)
  span.addEventListener('mouseenter', handleHover)
  return span
}

/**
 * Finds and highlights "bossfix" mentions in text nodes
 * @param {Node} node - DOM node to process
 */
function highlightBossFix(node: Node): void {
  if (!shouldProcessNode(node)) return

  if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
    const text = node.nodeValue
    const regex = /bossfix/gi

    if (regex.test(text)) {
      const fragment = document.createDocumentFragment()
      let lastIndex = 0
      let match: RegExpExecArray | null

      regex.lastIndex = 0
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.slice(lastIndex, match.index)),
          )
        }
        fragment.appendChild(createHighlight(match[0]))
        lastIndex = regex.lastIndex
      }

      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
      }

      node.parentNode?.replaceChild(fragment, node)
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    processedNodes.add(node)
    Array.from(node.childNodes).forEach(highlightBossFix)
  }
}

// Initialize extension
initializeSound()

// Setup mutation observer
new MutationObserver((mutations) => {
  if (isProcessing) return
  isProcessing = true
  try {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && shouldProcessNode(node)) {
          highlightBossFix(node)
        }
      })
    })
  } finally {
    isProcessing = false
  }
}).observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
})

// Initial scan
highlightBossFix(document.body)
