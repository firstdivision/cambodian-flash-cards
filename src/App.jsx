import FlashcardContainer from './components/FlashcardContainer'
import { travelFlashcards } from './data/travelFlashcards'
import './App.css'

function App() {
  return <FlashcardContainer cards={travelFlashcards} />
}

export default App
