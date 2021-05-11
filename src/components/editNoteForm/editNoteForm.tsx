import { ChangeEvent, FC, useState } from 'react'
import axios from 'axios'

// Material-UI
import {TextareaAutosize, TextField, Button, Fade} from '@material-ui/core'

// Interfaces
import { Inotes } from '../../interfaces/notes'

export const EditNoteForm: FC<{toggle: boolean, setToggle: Function, id: string, myNotes: Inotes[], getMyNotes: Function}> = ({setToggle, toggle, id, myNotes, getMyNotes}) => {

    const {title, content} = myNotes.filter(item => item._id === id)[0]
    const [editNote, setEditNote] = useState({
        title,
        content
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 

        const {value, name} = e.target

        setEditNote({
            ...editNote,
            [name]: value
        })

    }

    const submitEditNote = async () => {

        try {

            await axios.patch(`https://ts-lorem-notes-rest.herokuapp.com/editnote/${id}`, editNote, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            await getMyNotes()
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="createnotebox">
            <Fade in={toggle} mountOnEnter={true} unmountOnExit={true} >
                <form className="createnoteform" method="post">
                    <h1 style={{marginBottom: '0.1rem'}}> Edit Note </h1>
                    <TextField value={editNote.title} onChange={handleChange} style={{marginBottom: '0.3rem'}} label="Title" name="title" />
                    <TextareaAutosize value={editNote.content} onChange={handleChange} style={{padding: '0.5rem', borderRadius: '0.5px', fontSize: '0.8rem'}} placeholder="Content" rowsMin={7} name="content" />
                    <Button onClick={async () => {
                        await submitEditNote()
                        setToggle(false)
                    }} style={{marginTop: '0.5rem'}} variant="contained" color="primary" > Done </Button>
                    <Button onClick={() => {
                        setToggle(false)
                    }} style={{marginTop: '0.5rem'}} variant="contained" color="secondary" > Cancel </Button>
                </form>
            </Fade>
        </div>
    )

}