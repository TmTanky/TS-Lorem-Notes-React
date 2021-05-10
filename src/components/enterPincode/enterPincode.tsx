import { ChangeEvent, FC, useState } from 'react'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Material-UI
import {TextField, Button} from '@material-ui/core'

// Interfaces
import { Istate } from '../../interfaces/state'

// Redux
import { secretOff, secretOn } from '../../redux/actions/actions'

// CSS
import './pincode.css'

export const EnterPincode: FC = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const usersPincode = useSelector<Istate>(state => state.user.pincode)

    const [pincode, setPincode] = useState("")
    const [isLocked, setIsLocked] = useState<boolean>(false)
    const [retry, setRetry] = useState(1)
    const [pincodeError, setPincodeError] = useState<string[]>([])

    const enterPincode = () => {

        if (pincode === usersPincode) {
            dispatch(secretOn())
            return history.push('/secret')
        }

        setPincode("")
        setRetry(prevValue => prevValue + 1)
        if (retry === 3) {
            setIsLocked(true)
            setPincodeError(['Try again after 5 seconds.'])
            setTimeout(() => {
                setIsLocked(false)
                setPincodeError([])
                setRetry(1)
            }, 5000)
        }
        return console.log(isLocked)

    }

    return (
        <div className="pincodebox">
            <form method="post" className="pincodeform" >
                <h1 style={{marginBottom: '1rem'}} > Enter PIN code </h1>

                {pincodeError.length > 0 ? pincodeError.map(item => {
                    return <p key={item} > {item} </p>
                }) : ""}
                
                <TextField type="password" value={pincode} label="PIN" onChange={(e: ChangeEvent<HTMLInputElement>) => setPincode(e.target.value) } />
                <Button disabled={isLocked} onClick={enterPincode} color="primary" style={{marginTop: '1rem'}} variant="contained" > Enter </Button>
                <Button onClick={() => {
                    dispatch(secretOff())
                }} color="secondary" style={{marginTop: '0.2rem'}} variant="contained" > Back </Button>
            </form>
        </div>
    )

}