import { useState } from 'react'
import HeaderPhoto from './components/HeaderPhoto.jsx'
import MainContent from './components/MainContent.jsx'
import Footer from './components/Footer.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import './styles/App.css'
import './styles/HeaderPhoto.css'
import './styles/MainContent.css'
import './styles/Footer.css'
import './data/cardData.js'
import { cardData } from './data/cardData.js'

function App() {
  const [isDark, setIsDark] = useState(true);
  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)}/>
      <HeaderPhoto image={cardData.profileImage} alt={`${cardData.name}`}/>
      <MainContent data={cardData}/>
      <Footer social={cardData.social}/>
    </div>
  )
}

export default App
