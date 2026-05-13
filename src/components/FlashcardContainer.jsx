import { useEffect, useState } from 'react'
import Flashcard from './Flashcard'

const COOKIE_PREFIX = 'known_cards_'

function getKnownCards(languageKey) {
  const cookieName = `${COOKIE_PREFIX}${languageKey}`
  const match = document.cookie.match(new RegExp('(?:^|; )' + cookieName + '=([^;]*)'))
  if (!match) return []
  try {
    return JSON.parse(decodeURIComponent(match[1]))
  } catch {
    return []
  }
}

function saveKnownCards(languageKey, ids) {
  const cookieName = `${COOKIE_PREFIX}${languageKey}`
  const value = encodeURIComponent(JSON.stringify(ids))
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${cookieName}=${value}; expires=${expires}; path=/; SameSite=Lax`
}

function clearKnownCards(languageKey) {
  const cookieName = `${COOKIE_PREFIX}${languageKey}`
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`
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

function FlashcardContainer({
  cards,
  languageKey,
  languageName,
  shortName,
  frontLabel,
  languageOptions,
  onLanguageChange,
}) {
  const [knownIds, setKnownIds] = useState(() => new Set(getKnownCards(languageKey)))
  const [deck, setDeck] = useState(() => {
    const known = new Set(getKnownCards(languageKey))
    return shuffle(getUnknownCards(cards, known))
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const knownForLanguage = new Set(getKnownCards(languageKey))
    setKnownIds(knownForLanguage)
    setDeck(shuffle(getUnknownCards(cards, knownForLanguage)))
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [cards, languageKey])

  const languagePicker = (
    <label className="app-shell__language-picker">
      <span>Language</span>
      <select value={languageKey} onChange={(event) => onLanguageChange(event.target.value)}>
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )

  if (cards.length === 0) {
    return (
      <main className="app-shell">
        <header className="app-shell__header">
          <p className="app-shell__eyebrow">{languageName} Travel Flashcards</p>
          <h1>No flashcards available yet.</h1>
          {languagePicker}
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
    saveKnownCards(languageKey, [...newKnownIds])

    const newDeck = deck.filter((_, i) => i !== currentIndex)
    setDeck(newDeck)
    setCurrentIndex((current) => (newDeck.length > 0 ? current % newDeck.length : 0))
    setIsFlipped(false)
  }

  const resetStats = () => {
    clearKnownCards(languageKey)
    setKnownIds(new Set())
    setDeck(shuffle(cards))
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  if (deck.length === 0) {
    return (
      <main className="app-shell">
        <header className="app-shell__header">
          <p className="app-shell__eyebrow">{languageName} Travel Flashcards</p>
          <h1>You know all {knownIds.size} cards! 🎉</h1>
          {languagePicker}
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
        <p className="app-shell__eyebrow">{languageName} Travel Flashcards</p>
        <h1>Learn a few useful {shortName} phrases.</h1>
        {languagePicker}
        <ol className="app-shell__steps" aria-label="How to use">
          <li>
            <span className="app-shell__step-icon" aria-hidden="true">🃏</span>
            <span>Read the {frontLabel} on the card</span>
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
          <span>{isFlipped ? 'Pronunciation side' : `${shortName} side`}</span>
        </div>

        <Flashcard
          card={deck[currentIndex]}
          flipped={isFlipped}
          onFlip={() => setIsFlipped((current) => !current)}
          onKnow={handleKnow}
          frontLabel={frontLabel}
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
