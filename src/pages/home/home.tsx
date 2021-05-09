import {FC, useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

// Material-UI 
import {Fade, CircularProgress} from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// Components
import {CreateNoteForm} from '../../components/createNoteForm/createNoteForm'

// Interfaces
import { Istate } from '../../interfaces/state'
import { Inotes } from '../../interfaces/notes'

// CSS
import './home.css'

export const HomePage: FC = () => {

    const userID = useSelector<Istate>(state => state.user._id)
    const [open, setOpen] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [myNotes, setMyNotes] = useState<Inotes[]>([])

    const getMyNotes = useCallback(async () => {

        try {

            const {data} = await axios.post<{data: Inotes[]}>(`http://localhost:8000/getusernotes/${userID}`)

            if (data.data) {
                setMyNotes(data.data)
                setOpen(true)
            }
            
        } catch (err) {
            console.log(err)
        }

    },[userID])

    const markAsDone = async (noteID: string) => {

        try {

            await axios.patch(`http://localhost:8000/toggledonenote/${noteID}`)
            await getMyNotes()

        } catch (err) {
            console.log(err)
        }

    }

    const deleteNote = async (noteID: string) => {

        try {

            await axios.delete(`http://localhost:8000/deletenote/${userID}/${noteID}`)
            await getMyNotes()

        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getMyNotes()
    },[getMyNotes])

    return (
        <div>
            {open ? <Fade in={open} >
            <div className="homebox">
                <div className="hometitle">
                    <h1> My Notes </h1>
                </div>

                <div className="mynotes">
                    {myNotes.length > 0 ? myNotes.map(item => {
                        return <div key={item._id} className="note" >
                            
                            <div className="isdone">
                                {item.isDone ? <div>
                                    <DeleteForeverIcon onClick={() => {
                                        deleteNote(item._id)
                                    }} style={{cursor: 'pointer', marginRight: '0.2rem'}} />
                                    <CheckBoxIcon style={{cursor: 'pointer'}} onClick={() => {
                                    markAsDone(item._id)
                                }}/>
                                </div> : <CheckBoxOutlineBlankIcon style={{cursor: 'pointer'}} onClick={() => {
                                    markAsDone(item._id)
                                }} />}
                            </div>

                            <h2 style={{marginBottom: '0.5rem', borderBottom: 'solid 1px', textDecoration: `${item.isDone ? 'line-through' : ""}`}} > {item.title} </h2>
                            <p style={{textDecoration: `${item.isDone ? 'line-through' : ""}`}} > {item.content} </p>
                        </div>
                    }) : "" }
                </div>

                {isFormOpen ? <CreateNoteForm getMyNotes={getMyNotes} toggle={isFormOpen} setToggle={setIsFormOpen} /> : "" }

                <div className="addnote">
                    <AddCircleRoundedIcon className="addnotebtn" onClick={() => setIsFormOpen(true)} style={{fontSize: '3.5rem', color: 'red'}} />
                </div>
            </div>
        </Fade> : <div className="loading">
            <CircularProgress/>
        </div> }
        </div>
    )

}