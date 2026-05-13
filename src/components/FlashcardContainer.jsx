import { useState } from 'react'
import Flashcard from './Flashcard'

const COOKIE_NAME = 'cambodian_known_cards'

function getKnownCards() {
  const match = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)'))
  if (!match) return []
  try {
    return JSON.parse(decodeURIComponent(match[1]))
  } catch {
    return []
  }
}

function saveKnownCards(ids) {
  const value = encodeURIComponent(JSON.stringify(ids))
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires}; path=/; SameSite=Lax`
}

function clearKnownCards() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`
}

function getUnknownCards(cards, knownIds) {
  // Cards are identified by their unique English translation.
  return cards.filter((c) => !knownIds.has(c.english))
}

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function FlashcardContainer({ cards }) {
  const [knownIds, setKnownIds] = useState(() => new Set(getKnownCards()))
  const [deck, setDeck] = useState(() => {
    const known = new Set(getKnownCards())
    return shuffle(getUnknownCards(cards, known))
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  if (cards.length === 0) {
    return (
      <main className="app-shell">
        <header className="app-shell__header">
          <p className="app-shell__eyebrow">Cambodian Travel Flashcards</p>
          <h1>No flashcards available yet.</h1>
        </header>
      </main>
    )
  }

  const goToCard = (direction) => {
    setCurrentIndex((current) => {
      const nextIndex = (current + direction + deck.length) % deck.length
      return nextIndex
    })
    setIsFlipped(false)
  }

  const shuffleDeck = () => {
    setDeck(shuffle(getUnknownCards(cards, knownIds)))
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  const handleKnow = () => {
    const cardId = deck[currentIndex].english
    const newKnownIds = new Set([...knownIds, cardId])
    setKnownIds(newKnownIds)
    saveKnownCards([...newKnownIds])

    const newDeck = deck.filter((_, i) => i !== currentIndex)
    setDeck(newDeck)
    setCurrentIndex((current) => (newDeck.length > 0 ? current % newDeck.length : 0))
    setIsFlipped(false)
  }

  const resetStats = () => {
    clearKnownCards()
    setKnownIds(new Set())
    setDeck(shuffle(cards))
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  if (deck.length === 0) {
    return (
      <main className="app-shell">
        <header className="app-shell__header">
          <p className="app-shell__eyebrow">Cambodian Travel Flashcards</p>
          <h1>You know all {knownIds.size} cards! 🎉</h1>
        </header>
        <section className="deck">
          <p className="deck__all-known">
            Great job! You&apos;ve marked every card as known.
          </p>
          <button type="button" className="deck__reset-btn" onClick={resetStats}>
            🔄 Reset Card Stats
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header className="app-shell__header">
        <p className="app-shell__eyebrow">Cambodian Travel Flashcards</p>
        <h1>Learn a few useful Khmer phrases.</h1>
        <ol className="app-shell__steps" aria-label="How to use">
          <li>
            <span className="app-shell__step-icon" aria-hidden="true">🃏</span>
            <span>Read the Khmer script on the card</span>
          </li>
          <li>
            <span className="app-shell__step-icon" aria-hidden="true">👆</span>
            <span>Tap the card to flip it and hear the pronunciation</span>
          </li>
          <li>
            <span className="app-shell__step-icon" aria-hidden="true">➡️</span>
            <span>Use the buttons below to move to the next phrase</span>
          </li>
        </ol>
      </header>

      <section className="deck" aria-label="Flashcards">
        <div className="deck__status">
          <span>
            Card {currentIndex + 1} of {deck.length}
          </span>
          <span>{isFlipped ? 'Pronunciation side' : 'Khmer side'}</span>
        </div>

        <Flashcard
          card={deck[currentIndex]}
          flipped={isFlipped}
          onFlip={() => setIsFlipped((current) => !current)}
          onKnow={handleKnow}
        />

        <div className="deck__controls">
          <button type="button" onClick={() => goToCard(-1)}>
            ← Previous
          </button>
          <button type="button" className="deck__controls__shuffle" onClick={shuffleDeck}>
            🔀 Shuffle
          </button>
          <button type="button" onClick={() => goToCard(1)}>
            Next →
          </button>
        </div>

        {knownIds.size > 0 && (
          <div className="deck__footer">
            <span className="deck__known-count">
              {knownIds.size} card{knownIds.size === 1 ? '' : 's'} known
            </span>
            <button type="button" className="deck__reset-link" onClick={resetStats}>
              🔄 Reset Card Stats
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default FlashcardContainer
