export default function SocialIcon({icon: Icon, href}){
    // need to include react-icon as a react component in the return, so need to put it in a variable first to do this
    return(
        <a className="icon-box" 
        href={href} 
        target="_blank"
        rel="noopener noreferrer">
            <Icon />
        </a>
    )
}