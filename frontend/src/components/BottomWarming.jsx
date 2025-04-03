import {Link} from "react-router-dom"

export function BottomWarming({label,buttonText,to}){
    return <div className="py-2 text-sm flex justify-denter">
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
        </Link>
    </div>
}