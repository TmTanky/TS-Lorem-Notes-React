import {ChangeEvent, FC, useState} from 'react'
import axios from 'axios'

// Interfaces
import { Inotes } from '../../interfaces/notes'

// Material-UI
import {Fade, TextareaAutosize, TextField, Button}from '@material-ui/core'

export const EditSecretForm: FC<{id: string, myNotes: Inotes[], toggle: boolean, setToggle: Function, getMySecretNotes: Function}> = ({id, myNotes, toggle, setToggle, getMySecretNotes}) => {

    const {title, content} = myNotes.filter(item => item._id === id)[0]
    const [editNote, setEditNote] = useState({
        title,
        content,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target

        setEditNote({
            ...editNote,
            [name]: value
        })
    }
    
    const submitEditSecret = async () => {

        try {

            await axios.patch(`https://ts-lorem-notes-rest.herokuapp.com/editnote/${id}`, editNote, {
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
            <Fade in={toggle} >
                <form className="createnoteform" method="post">
                    <h1> Edit Secret Note </h1>
                    <TextField value={editNote.title} name="title" onChange={handleChange} style={{marginTop: '1rem'}} />
                    <TextareaAutosize value={editNote.content} name="content" onChange={handleChange} style={{marginTop: '1rem', padding: '0.5rem', fontSize: '0.8rem'}} rowsMin={7} />
                    <Button onClick={submitEditSecret} style={{marginTop: '0.3rem'}} color="primary" variant="contained" > Edit Done </Button>
                    <Button color="secondary" variant="contained" onClick={() => setToggle(false)} > Cancel </Button>
                </form>
            </Fade>
        </div>
    )

}