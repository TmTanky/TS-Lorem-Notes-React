import {ChangeEvent, FC, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

// Material-UI
import {TextField, Button} from '@material-ui/core'

// CSS
import './login.css'

export const LoginPage: FC = () => {

    const [login, setLogin] = useState({
        email: "",
        password: ""
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

            const {data} = await axios.post('http://localhost:8000/login', login)

            console.log(data)
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="loginbox">
            <div className="loginsideintro">
                <h1> Create notes and be happy </h1>
                <p> Lorem ipsum dolor sit amet consectetur. </p>
            </div>

            <div className="loginformbox">
                <form method="post" className="loginform">
                    <h1 style={{marginBottom: '1rem'}} > Login </h1>
                    <TextField style={{marginBottom: '0.5rem'}} label="Email" type="email" name="email" value={login.email} onChange={handleChange} />
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