import ContactButton from './ContactButton.jsx'
import { FaLinkedin, FaEnvelope } from "react-icons/fa"


export default function MainContent() {
    return(
        <>
            <h1>John Doe</h1>
            <h2>Frontend Developer</h2>
            <a href="https://ibmspence.dev/">Portfolio</a>
            <ContactButton 
                label="Email"
                icon={FaEnvelope}
                href="mailto:johndoe@johndoe.com"    
                className="email-icon"
            />
            <ContactButton 
                label="LinkedIn"
                icon={FaLinkedin}
                href="https://www.linkedin.com/in/ibmspence/"
                className="linkedin-icon"    
            />
        </>
    )
}