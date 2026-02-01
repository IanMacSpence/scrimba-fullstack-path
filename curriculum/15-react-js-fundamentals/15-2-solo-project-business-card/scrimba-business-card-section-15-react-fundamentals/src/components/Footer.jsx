import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa"
import SocialIcon from './SocialIcon.jsx'
import '../styles/Footer.css'
import '../styles/SocialIcon.css'

export default function Footer({ social }) {
    return(
        <footer className="footer">
            <SocialIcon 
                icon={FaTwitter}
                href={social.twitter}
            />
            <SocialIcon 
                icon={FaFacebook}
                href={social.facebook}
            />
            <SocialIcon 
                icon={FaInstagram}
                href={social.instagram}
            />
            <SocialIcon 
                icon={FaGithub}
                href={social.github}
            />
        </footer>
    )
}
