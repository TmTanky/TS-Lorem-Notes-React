import {FC, useState, useEffect, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'

// Material-UI 
import {Fade, CircularProgress, Tooltip} from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpen';

// Components
import {CreateNoteForm} from '../../components/createNoteForm/createNoteForm'
import {EditNoteForm} from '../../components/editNoteForm/editNoteForm'

// Interfaces
import { Istate } from '../../interfaces/state'
import { Inotes } from '../../interfaces/notes'

// Redux
import { secretPending } from '../../redux/actions/actions'

// CSS
import './home.css'

export const HomePage: FC = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const userID = useSelector<Istate>(state => state.user._id)

    const [open, setOpen] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selectedID, setSelectedID] = useState("")
    const [myNotes, setMyNotes] = useState<Inotes[]>([])

    const getMyNotes = useCallback(async () => {

        try {

            const {data} = await axios.post<{data: Inotes[]}>(`http://localhost:8000/getusernotes/${userID}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

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

            await axios.patch(`http://localhost:8000/toggledonenote/${noteID}`, null, {
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

    const deleteNote = async (noteID: string) => {

        try {

            await axios.delete(`http://localhost:8000/deletenote/${userID}/${noteID}`, {
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

    useEffect(() => {
        getMyNotes()
    },[getMyNotes])

    return (
        <div className="mainhome" >
            {open ? <Fade in={open} >
            <div className="homebox">
                <div className="hometitle">
                    <h1> My Notes </h1>
                </div>

                {myNotes.length === 0 ? <h2 style={{textAlign: 'center'}} > No notes, create one now. </h2> : null }

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
                                </div> : <div>
                                    <EditIcon onClick={() => {
                                        setSelectedID(item._id)
                                        setIsEditOpen(true)
                                    }} style={{cursor: 'pointer'}} /> <CheckBoxOutlineBlankIcon style={{cursor: 'pointer'}} onClick={() => {
                                        markAsDone(item._id)
                                    }} />
                                </div> }
                            </div>

                            <h2 style={{marginBottom: '0.5rem', borderBottom: 'solid 1px', textDecoration: `${item.isDone ? 'line-through' : ""}`}} > {item.title} </h2>
                            <p style={{textDecoration: `${item.isDone ? 'line-through' : ""}`}} > {item.content} </p>
                        </div>

                    }) : null }
                </div>

                {isFormOpen ? <CreateNoteForm getMyNotes={getMyNotes} toggle={isFormOpen} setToggle={setIsFormOpen} /> : null }
                {isEditOpen ? <EditNoteForm getMyNotes={getMyNotes} myNotes={myNotes} id={selectedID} toggle={isEditOpen} setToggle={setIsEditOpen} /> : null }

                <div className="addnote">
                    <Tooltip placement="top" title="Add Note">
                        <AddCircleRoundedIcon className="addnotebtn" onClick={() => setIsFormOpen(true)} style={{fontSize: '3rem', color: 'red'}} />
                    </Tooltip>
                    
                    <Tooltip placement="top" title="Open Secrets">
                        <LockOpenIcon onClick={() => {
                            dispatch(secretPending())
                            history.push('/enterpincode')
                        }} style={{fontSize: '3rem', color: 'black', cursor: 'pointer'}} />
                    </Tooltip>
                </div>
            </div>
        </Fade> : <div className="loading">
            <CircularProgress/>
        </div> }
        </div>
    )

}