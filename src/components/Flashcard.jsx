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

function CardFace({ side, hintText, topic, text, detail }) {
  return (
    <span className={`flashcard__face flashcard__face--${side}`} aria-hidden="true">
      <span className="flashcard__hint">
        <FlipIcon />
        {hintText}
      </span>
      <span className="flashcard__topic">{topic}</span>
      <span className="flashcard__text">{text}</span>
      <span className="flashcard__detail">{detail}</span>
    </span>
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
        <CardFace
          side="front"
          hintText="Tap to reveal pronunciation"
          topic={card.english}
          text={card.khmer}
          detail="Khmer script"
        />
        <CardFace
          side="back"
          hintText="Tap to see Khmer script"
          topic={card.english}
          text={card.phonetic}
          detail="Phonetic pronunciation"
        />
      </button>
    </div>
  )
}

export default Flashcard
