import profilePic from '../assets/cgpt-profile-pic.png'
import '../styles/HeaderPhoto.css'

export default function HeaderPhoto() {
    return(
        <img src={profilePic} className='header-photo' alt="John Johnson headshot" />
    )
}