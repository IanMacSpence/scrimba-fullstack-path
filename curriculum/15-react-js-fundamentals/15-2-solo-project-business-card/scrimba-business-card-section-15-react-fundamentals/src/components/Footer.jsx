import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa"
import SocialIcon from './SocialIcon.jsx'
import '../styles/Footer.css'
import '../styles/SocialIcon.css'

export default function Footer() {
    return(
        <footer className="footer">
            <SocialIcon 
                icon={FaTwitter}
                href="https://twitter.com"
            />
            <SocialIcon 
                icon={FaFacebook}
                href="https://facebook.com"
            />
            <SocialIcon 
                icon={FaInstagram}
                href="https://instagram.com"
            />
            <SocialIcon 
                icon={FaGithub}
                href="https://github.com"
            />
        </footer>
    )
}
