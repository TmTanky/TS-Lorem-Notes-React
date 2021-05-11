import { ChangeEvent, FC, useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

// Material-UI
import {Fade, TextField, TextareaAutosize, Button} from '@material-ui/core'

// Interfaces
import { Istate } from '../../interfaces/state'

export const CreateSecretForm: FC<{toggle: boolean, setToggle: Function, getMySecretNotes: Function}> = ({toggle, setToggle, getMySecretNotes}) => {

    const userID = useSelector<Istate>(state => state.user._id)

    const [isSecret] = useState(true)
    const [note, setNote] = useState({
        title: "",
        content: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target

        setNote({
            ...note,
            [name]: value
        })
    }

    const createNote =  async () => {
        
        try {

            await axios.post(`http://localhost:8000/createnote/${userID}`, {note, isSecret}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            await getMySecretNotes()
            setToggle(false)
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="createnotebox">
            <Fade in={toggle} mountOnEnter={true} unmountOnExit={true} >
                <form method="post" className="createnoteform" >
                    <h1> Create Secret Note </h1>
                    <TextField value={note.title} name="title" onChange={handleChange} style={{marginTop: '0.5rem'}} label="Title" />
                    <TextareaAutosize value={note.content} name="content" onChange={handleChange} style={{fontSize: '0.8rem', padding: '0.5rem', marginTop: '0.5rem'}} rowsMin={7} placeholder="Secret Content" />
                    <Button onClick={createNote} style={{marginTop: '0.5rem'}} color="primary" variant="contained" > Create </Button>
                    <Button onClick={() => setToggle(false)} color="secondary" variant="contained" > Cancel </Button>
                </form>
            </Fade>
        </div>
    )

}