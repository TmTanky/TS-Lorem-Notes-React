import {ChangeEvent, FC, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// Interfaces
import { IuserInfo } from '../../interfaces/userInfo'

// Material-UI
import {TextField, Button} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { loginTrue, loginUser } from '../../redux/actions/actions'

// CSS
import './login.css'

export const LoginPage: FC = () => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const [loginError, setLoginError] = useState<{error: string[]}>({
        error: []
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        
        setLogin({
            ...login,
            [name]: value
        })
    }

    const loginSubmit = async () => {
        
        try {

            const {data} = await axios.post<{data: IuserInfo, msg: string, token: string}>('http://localhost:8000/login', login)

            if (data.data) {
                localStorage.setItem('token', data.token)
                dispatch(loginUser(data.data))
                dispatch(loginTrue())
            }

            if (data.msg) {
                setLoginError({
                    error: [data.msg]
                })
                setOpen(true)
            }
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="loginbox">
            <div className="loginsideintro">
                <h1> Create notes and be happy </h1>
                <p> Stay safe and godbless. </p>
            </div>

            <div className="loginformbox">
                <form method="post" className="loginform">
                    <h1> Login </h1>

                    {loginError.error.length > 0 ? loginError.error.map(item => {
                        return (
                            <Collapse key={item} style={{marginBottom: '1rem', marginTop: '1rem'}} in={open}>
                                <Alert
                                severity="error"
                                action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false)
                                        setLoginError({
                                            error: []
                                        })
                                    }}
                                    >
                                    <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                >
                                {item}
                                </Alert>
                            </Collapse>
                        )
                    }) : ""}

                    <TextField style={{marginBottom: '0.5rem'}} label="Email or Username" type="email" name="email" value={login.email} onChange={handleChange} />
                    <TextField label="Password" type="password" name="password" value={login.password} onChange={handleChange} />

                    <Button disabled={
                        login.email === "" || login.password === ""
                    } onClick={loginSubmit} style={{marginTop: '0.5rem'}} variant="contained" color="primary" > Login </Button>
                    <Link style={{marginTop: '0.2rem'}} to="/register" > Register here. </Link>
                </form>
            </div>
        </div>
    )

}