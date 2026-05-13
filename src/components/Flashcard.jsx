function FlipIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flashcard__flip-icon"
    >
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 014-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  )
}

function Flashcard({ card, flipped, onFlip }) {
  return (
    <div className="flashcard-wrapper">
      <button
        type="button"
        className={`flashcard${flipped ? ' flashcard--flipped' : ''}`}
        onClick={onFlip}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `${card.english}: phonetic pronunciation is ${card.phonetic}. Tap to flip back.`
            : `${card.english}: Khmer script shown. Tap to reveal phonetic pronunciation.`
        }
      >
        <span className="flashcard__face flashcard__face--front" aria-hidden="true">
          <span className="flashcard__hint">
            <FlipIcon />
            Tap to reveal pronunciation
          </span>
          <span className="flashcard__topic">{card.english}</span>
          <span className="flashcard__text">{card.khmer}</span>
          <span className="flashcard__detail">Khmer script</span>
        </span>

        <span className="flashcard__face flashcard__face--back" aria-hidden="true">
          <span className="flashcard__hint">
            <FlipIcon />
            Tap to see Khmer script
          </span>
          <span className="flashcard__topic">{card.english}</span>
          <span className="flashcard__text">{card.phonetic}</span>
          <span className="flashcard__detail">Phonetic pronunciation</span>
        </span>
      </button>
    </div>
  )
}

export default Flashcard
