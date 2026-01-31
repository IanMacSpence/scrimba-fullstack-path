import '../styles/ContactButton.css'
export default function ContactButton(props){
    const Icon = props.icon;
    return(
        // chose anchor element here and not a button because it redirects to a link
        <a
            href={props.href}
            className={`contact-button ${props.className}`}
            target="_blank"
            rel="noopener noreferrer"

        >
            <Icon />
            <span>{props.label}</span>
        </a>
    )
}