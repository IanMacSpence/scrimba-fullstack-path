export default function ContactButton(props){
    return(
        // choose anchor element here, not a button, because it redirects to a link
        <a
            href={props.href}
            className={`contact-button ${props.className}`}
            target="_blank"
            rel="noopener noreferrer"

        >
            {props.icon}
            <span>{props.label}</span>
        </a>
    )
}