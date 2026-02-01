import ContactButton from './ContactButton.jsx'
import { FaLinkedin, FaEnvelope } from "react-icons/fa"


export default function MainContent({data}) {
    return(
        <main className="main-content">
            <div className='main-details'>
                <h1>{data.name}</h1>
                <p className='job-title'>{data.title}</p>
                <a 
                    href={data.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='portfolio-link'
                >Portfolio</a>
            </div>
            <div className='main-btn-wrapper'>
                <ContactButton 
                    label="Email"
                    icon={FaEnvelope}
                    href={`mailto:${data.email}`}   
                    className="email-btn"
                />
                <ContactButton 
                    label="LinkedIn"
                    icon={FaLinkedin}
                    href={data.linkedIn}
                    className="linkedin-btn"    
                />
            </div>

            <h2>About</h2>
            <p>{data.about}</p>
            <h2>Interests</h2>
            <p>{data.interests}</p>
        </main>
    )
}