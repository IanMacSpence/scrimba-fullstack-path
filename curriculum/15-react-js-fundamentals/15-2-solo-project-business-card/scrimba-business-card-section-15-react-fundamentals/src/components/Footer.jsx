import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa"
import SocialMediaIcon from './SocialMediaIcon.jsx'
import '../styles/Footer.css'

export default function Footer() {
    return(
        <footer className="footer">
            <a className="icon-box" href="https://twitter.com" target="_blank">
                <FaTwitter />
            </a>
            <a className="icon-box" href="https://facebook.com" target="_blank">
                <FaFacebook />
            </a>
            <a className="icon-box" href="https://instagram.com" target="_blank">
                <FaInstagram />
            </a>
            <a className="icon-box" href="https://github.com" target="_blank">
                <FaGithub />
            </a>
        </footer>
    )
}