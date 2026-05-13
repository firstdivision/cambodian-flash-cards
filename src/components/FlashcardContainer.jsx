import { useState } from 'react'
import Flashcard from './Flashcard'

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function FlashcardContainer({ cards }) {
  const [deck, setDeck] = useState(() => shuffle(cards))
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
    setDeck(shuffle(cards))
    setCurrentIndex(0)
    setIsFlipped(false)
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
      </section>
    </main>
  )
}

export default FlashcardContainer
