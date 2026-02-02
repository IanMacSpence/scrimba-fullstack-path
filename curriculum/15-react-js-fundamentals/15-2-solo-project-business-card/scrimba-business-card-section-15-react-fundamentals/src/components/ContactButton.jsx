import '../styles/ContactButton.css'
export default function ContactButton({ icon: Icon, href, label, className}){
    return(
        // chose anchor element here and not a button because it redirects to a link
        <a
            href={href}
            className={`contact-button ${className}`}
            target="_blank"
            rel="noopener noreferrer"

        >
            <Icon />
            <span>{label}</span>
        </a>
    )
}