import { useState } from 'react'
import FlashcardContainer from './components/FlashcardContainer'
import { languageDecks } from './data/travelFlashcards'
import './App.css'

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('khmer')
  const selectedDeck = languageDecks[selectedLanguage]

  return (
    <FlashcardContainer
      key={selectedLanguage}
      cards={selectedDeck.cards}
      languageKey={selectedLanguage}
      languageName={selectedDeck.languageName}
      shortName={selectedDeck.shortName}
      frontLabel={selectedDeck.frontLabel}
      languageOptions={Object.entries(languageDecks).map(([value, deck]) => ({
        value,
        label: deck.languageName,
      }))}
      onLanguageChange={setSelectedLanguage}
    />
  )
}

export default App
