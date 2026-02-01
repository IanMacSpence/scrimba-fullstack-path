import HeaderPhoto from './components/HeaderPhoto.jsx'
import MainContent from './components/MainContent.jsx'
import Footer from './components/Footer.jsx'
import './styles/App.css'
import './styles/HeaderPhoto.css'
import './styles/MainContent.css'
import './styles/Footer.css'
import './data/cardData.js'
import { cardData } from './data/cardData.js'

function App() {


  return (
    <div className="app">
      <HeaderPhoto image={cardData.profileImage} alt={`${cardData.name}`}/>
      <MainContent data={cardData}/>
      <Footer social={cardData.social}/>
    </div>
  )
}

export default App
