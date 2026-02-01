import ContactButton from './ContactButton.jsx'
import { FaLinkedin, FaEnvelope } from "react-icons/fa"


export default function MainContent() {
    return(
        <main className="main-content">
            <div className='main-details'>
                <h1>John Johnson</h1>
                <span className='job-title'>Frontend Developer</span>
                <a 
                    href="https://ibmspence.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='portfolio-link'
                >Portfolio</a>
            </div>
            <div className='main-btn-wrapper'>
                <ContactButton 
                    label="Email"
                    icon={FaEnvelope}
                    href="mailto:johndoe@johndoe.com"    
                    className="email-btn"
                />
                <ContactButton 
                    label="LinkedIn"
                    icon={FaLinkedin}
                    href="https://www.linkedin.com/in/ibmspence/"
                    className="linkedin-btn"    
                />
            </div>

            <h2>About</h2>
            <p>I am a frontend developer with a particular interest in making things simple and automating daily tasks. I try to keep up with security and best practices, and am always looking for new things to learn.</p>
            <h2>Interests</h2>
            <p>Food expert. Music scholar. Reader. Internet fanatic. Bacon buff. Entrepreneur. Travel geek. Pop culture ninja. Coffee fanatic.</p>
        </main>
    )
}