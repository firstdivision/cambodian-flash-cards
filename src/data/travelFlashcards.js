const khmerCards = [
  { english: 'Yes', target: 'បាទ / ចាស', phonetic: 'baat / jah' },
  { english: 'No', target: 'ទេ', phonetic: 'teh' },
  { english: 'Hello', target: 'ជំរាបសួរ', phonetic: 'suh-SDEY' },
  { english: 'Please', target: 'សូម', phonetic: 'som' },
  { english: 'Thank you', target: 'អរគុណ', phonetic: 'aw-kun' },
  { english: 'Excuse me', target: 'សូមទោស', phonetic: 'som-toh' },
  { english: 'How much?', target: 'ប៉ុន្មាន?', phonetic: 'pon-maan?' },
  { english: 'Water', target: 'ទឹក', phonetic: 'teuk' },
  {
    english: 'Where is the bathroom?',
    target: 'បន្ទប់ទឹកនៅឯណា?',
    phonetic: 'bon-tup teuk nov ae-na?',
  },
  { english: 'Help!', target: 'ជួយផង!', phonetic: 'joo-ee phong!' },
]

const vietnameseCards = [
  { english: 'Yes', target: 'Vâng', phonetic: 'vuhng' },
  { english: 'No', target: 'Không', phonetic: 'khawng' },
  { english: 'Hello', target: 'Xin chào', phonetic: 'sin chow' },
  { english: 'Please', target: 'Làm ơn', phonetic: 'lahm uhn' },
  { english: 'Thank you', target: 'Cảm ơn', phonetic: 'gahm uhn' },
  { english: 'Excuse me', target: 'Xin lỗi', phonetic: 'sin loy' },
  { english: 'How much?', target: 'Bao nhiêu?', phonetic: 'bao nyew?' },
  { english: 'Water', target: 'Nước', phonetic: 'nook' },
  {
    english: 'Where is the bathroom?',
    target: 'Nhà vệ sinh ở đâu?',
    phonetic: 'nya vay sin uh dow?',
  },
  { english: 'Help!', target: 'Cứu tôi với!', phonetic: 'koo toy voy!' },
]

export const languageDecks = {
  khmer: {
    languageName: 'Cambodian (Khmer)',
    shortName: 'Khmer',
    frontLabel: 'Khmer script',
    cards: khmerCards,
  },
  vietnamese: {
    languageName: 'Vietnamese',
    shortName: 'Vietnamese',
    frontLabel: 'Vietnamese',
    cards: vietnameseCards,
  },
}
