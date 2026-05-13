import { useState } from 'react'
import Flashcard from './Flashcard'

function FlashcardContainer({ cards }) {
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
      const nextIndex = (current + direction + cards.length) % cards.length
      return nextIndex
    })
    setIsFlipped(false)
  }

  return (
    <main className="app-shell">
      <header className="app-shell__header">
        <p className="app-shell__eyebrow">Cambodian Travel Flashcards</p>
        <h1>Practice a few useful Khmer phrases before you land.</h1>
        <p className="app-shell__description">
          Flip each card to reveal an easy phonetic pronunciation, then move to
          the next phrase when you are ready.
        </p>
      </header>

      <section className="deck" aria-label="Flashcards">
        <div className="deck__status">
          <span>
            Card {currentIndex + 1} of {cards.length}
          </span>
          <span>{isFlipped ? 'Pronunciation side' : 'Phrase side'}</span>
        </div>

        <Flashcard
          card={cards[currentIndex]}
          flipped={isFlipped}
          onFlip={() => setIsFlipped((current) => !current)}
        />

        <div className="deck__controls">
          <button type="button" onClick={() => goToCard(-1)}>
            Previous
          </button>
          <button type="button" onClick={() => goToCard(1)}>
            Next
          </button>
        </div>
      </section>
    </main>
  )
}

export default FlashcardContainer
