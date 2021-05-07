import {ChangeEvent, FC, useState} from 'react'
import axios from 'axios'

// Material-UI
import {TextField, Button} from '@material-ui/core'

export const RegisterPage: FC = () => {

    const [register,setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
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

            const {data} = await axios.post('http://localhost:8000/register', register)
            console.log(data)
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <form method="post">
            <TextField style={{marginBottom: '0.5rem'}} label="First Name" type="text" onChange={handleChange} value={register.firstName} name="firstName" />
            <TextField style={{marginBottom: '0.5rem'}} label="Last Name" type="text" onChange={handleChange} value={register.lastName} name="lastName" />
            <TextField style={{marginBottom: '0.5rem'}} label="Email" type="email" onChange={handleChange} value={register.email} name="email" />
            <TextField style={{marginBottom: '0.5rem'}} label="Password" type="password" onChange={handleChange} value={register.password} name="password" />

            <Button disabled={
                register.email === "" || register.firstName === "" || register.lastName === "" || register.password === ""
            } onClick={registerSubmit} variant="contained" color="primary" > Login </Button>
        </form>
    )

}