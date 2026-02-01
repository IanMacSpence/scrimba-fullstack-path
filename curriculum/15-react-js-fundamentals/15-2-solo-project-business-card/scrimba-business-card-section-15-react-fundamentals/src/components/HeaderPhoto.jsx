import '../styles/HeaderPhoto.css'

export default function HeaderPhoto({image, alt}) {
    return(
        <img src={image} className='header-photo' alt={alt} />
    )
}