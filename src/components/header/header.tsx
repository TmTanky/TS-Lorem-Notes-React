import {FC} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Istate } from '../../interfaces/state'
import { loginFalse, logoutUser, secretOff } from '../../redux/actions/actions'

// CSS
import './header.css'

export const Header: FC = () => {

    const isLoggedIn = useSelector<Istate>(state => state.isLoggedIn)
    const dispatch = useDispatch()

    return (
        <nav>
            <div className="navlogo">
                <h3> Lorem-Notes </h3>
            </div>

            {isLoggedIn ? <div className="navlinks">
                <p onClick={() => {
                    dispatch(logoutUser())
                    dispatch(loginFalse())
                    dispatch(secretOff())
                }} style={{color: 'white', cursor: 'pointer'}} > Logout </p>
            </div> : ""}
        </nav>
    )

}