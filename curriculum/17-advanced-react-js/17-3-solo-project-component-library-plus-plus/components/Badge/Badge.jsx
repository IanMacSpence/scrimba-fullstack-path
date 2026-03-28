import clsx from 'clsx';

import "./Badge.token.css"
import "./Badge.css"


export default function Badge({children, className, variant, color, ...rest}){
    let variantClass = variant && `badge--${variant}`
    let colorClass = color && `badge--${color}`
    const allClasses = clsx("badge", variantClass, colorClass, className)

    return(
        <span className={allClasses}>{children}</span>
    )
}