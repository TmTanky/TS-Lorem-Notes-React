import {ChangeEvent, FC, useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

// Interfaces
import { Istate } from '../../interfaces/state'

// Material-UI
import { TextField, Button, TextareaAutosize, Fade, Switch } from '@material-ui/core'

// CSS
import './createNoteForm.css'

export const CreateNoteForm: FC<{setToggle: Function, toggle: boolean, getMyNotes: Function}> = ({setToggle, toggle, getMyNotes}) => {

    const userID = useSelector<Istate>(state => state.user._id)
    const [isSecret, setIsSecret] = useState(false)
    const [note, setNote] = useState({
        title: "",
        content: ""
    })
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsSecret(!isSecret)
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            await getMyNotes()
            setToggle(false)
            
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="createnotebox">
            <Fade in={toggle} mountOnEnter={true} unmountOnExit={true}>
                <form method="post" className="createnoteform" >
                    <h1 style={{marginBottom: '0.1rem'}}> Create Note </h1>
                    <TextField style={{marginBottom: '0.3rem'}} name="title" label="Title" value={note.title} onChange={handleInputChange} />
                    <TextareaAutosize name="content" style={{padding: '0.5rem', borderRadius: '0.5px', fontSize: '0.8rem'}} value={note.content} onChange={handleInputChange} rowsMin={7} placeholder="Content" />
                    
                    <span>
                        <Switch
                            checked={isSecret}
                            onChange={handleChange}
                            name="checkedA"
                        />
                        <p> Secret: {isSecret ? <strong> Yes </strong> : <strong> No </strong> } </p>
                    </span>

                    <Button disabled={note.title === "" || note.content === ""} onClick={createNote} style={{marginTop: '0.5rem'}} variant="contained" color="primary"> Create Note </Button>
                    <Button onClick={() => setToggle(false)} style={{marginTop: '0.2rem'}} variant="contained" color="secondary"> Cancel </Button>
                </form>
            </Fade> 
        </div>
    )

} 