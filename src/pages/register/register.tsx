import {ChangeEvent, FC, useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

// Redux
import { loginTrue, loginUser } from '../../redux/actions/actions';

// Interfaces
import { IuserInfo } from '../../interfaces/userInfo';

// Material-UI
import {TextField, Button} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

// CSS
import './register.css'

export const RegisterPage: FC = () => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [register,setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        pincode: ""
    })
    const [registerError, setRegisterError] = useState<{error: string[]}>({
        error: []
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target

        setRegister({
            ...register,
            [name]: value
        })
    }

    const registerSubmit = async () => {
    
        try {

            const {data} = await axios.post<{data: IuserInfo, msg: string, token: string}>('http://localhost:8000/register', register)
            
            if (data.data) {
                localStorage.setItem('token', data.token)
                dispatch(loginUser(data.data))
                dispatch(loginTrue())
            }

            if (data.msg) {
                setRegisterError({
                    error: [data.msg]
                })
                setOpen(true)
            }
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="registerbox">
            <form method="post" className="registerform" >
                <h1> Register </h1>

                {registerError.error.length > 0 ? registerError.error.map(item => {
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
                                        setRegisterError({
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

                <TextField style={{marginBottom: '0.5rem'}} label="First Name" type="text" onChange={handleChange} value={register.firstName} name="firstName" />
                <TextField style={{marginBottom: '0.5rem'}} label="Last Name" type="text" onChange={handleChange} value={register.lastName} name="lastName" />
                <TextField style={{marginBottom: '0.5rem'}} label="Email or Username" type="email" onChange={handleChange} value={register.email} name="email" />
                <TextField style={{marginBottom: '0.5rem'}} label="Password" type="password" onChange={handleChange} value={register.password} name="password" />
                <TextField style={{marginBottom: '0.5rem'}} label="PIN" type="password" onChange={handleChange} value={register.pincode} name="pincode" />

                <Button disabled={
                    register.email === "" || register.firstName === "" || register.lastName === "" || register.password === ""
                } onClick={registerSubmit} variant="contained" color="primary" > Login </Button>
                <Link style={{marginTop: '0.2rem'}} to="/" > Login here. </Link>
            </form>
        </div>
    )

}