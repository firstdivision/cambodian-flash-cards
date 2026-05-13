function Flashcard({ card, flipped, onFlip }) {
  return (
    <button
      type="button"
      className={`flashcard${flipped ? ' flashcard--flipped' : ''}`}
      onClick={onFlip}
      aria-pressed={flipped}
    >
      <span className="flashcard__hint">
        {flipped ? 'Tap to see the Khmer phrase' : 'Tap to reveal pronunciation'}
      </span>
      <span className="flashcard__topic">{card.english}</span>
      <span className="flashcard__text">
        {flipped ? card.phonetic : card.khmer}
      </span>
      <span className="flashcard__detail">
        {flipped ? 'Phonetic pronunciation' : 'Khmer script'}
      </span>
    </button>
  )
}

export default Flashcard
