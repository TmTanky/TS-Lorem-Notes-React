import {FC} from 'react'

// CSS
import './footer.css'

export const Footer: FC = () => {

    const year = new Date().getFullYear()

    return (
        <footer>
            Copyright &copy; Lorem-Notes {year} 
        </footer>
    )

}