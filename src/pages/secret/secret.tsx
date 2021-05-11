import { FC, useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// Material-UI
import {CircularProgress, Fade, Tooltip} from '@material-ui/core'
import {AddCircleRounded} from '@material-ui/icons'
import LockIcon from '@material-ui/icons/Lock';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

// Interfaces
import { Istate } from '../../interfaces/state'
import { Inotes } from '../../interfaces/notes'

// Redux
import { secretOff } from '../../redux/actions/actions';
import { CreateSecretForm } from '../../components/createSecretForm/createSecretForm'
import { EditSecretForm } from '../../components/editSecretForm/editSecretForm'

export const SecretHome: FC = () => {

    const dispatch = useDispatch()
    const userID = useSelector<Istate>(state => state.user._id)

    const [open, setOpen] = useState(false)
    const [createNote, setCreateNote] = useState(false)
    const [selectedID, setSelectedID] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [myNotes, setMyNotes] = useState<Inotes[]>([])

    const getMySecretNotes = useCallback(async () => {

        try {

            const {data} = await axios.post<{data: Inotes[]}>(`https://ts-lorem-notes-rest.herokuapp.com/getusersecretnotes/${userID}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            setMyNotes(data.data)
            setOpen(true)

        } catch (err) {
            console.log(err)
        }

    },[userID])

    const deleteNote = async (noteID: string) => {

        try {

            await axios.delete(`https://ts-lorem-notes-rest.herokuapp.com/deletenote/${userID}/${noteID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            await getMySecretNotes()

        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getMySecretNotes()
    },[getMySecretNotes])

    return (
        <div className="mainhome" >
            {open ? <Fade in={open} >
                <div className="mainhome">

                    <div className="hometitle">
                        <h1> Secret Notes </h1>
                    </div>

                    {myNotes.length === 0 ? <h2 style={{textAlign: 'center'}} > No secrets, create one. </h2> : null }

                    <div className="mynotes">
                        {myNotes.length > 0 ? myNotes.map(item => {
                            return <div key={item._id} className="note">

                            <div className="isdone">
                                <div>
                                    <EditIcon onClick={() => {
                                        setSelectedID(item._id)
                                        setIsEdit(true)
                                    }} style={{cursor: 'pointer'}} />
                                    <DeleteForeverIcon onClick={() => deleteNote(item._id)} style={{cursor: 'pointer'}} />
                                </div>
                            </div>

                                <h2 style={{marginBottom: '0.5rem', borderBottom: 'solid 1px', textDecoration: `${item.isDone ? 'line-through' : ""}`}} > {item.title} </h2>
                                <p style={{textDecoration: `${item.isDone ? 'line-through' : ""}`}} > {item.content} </p>
                            </div>
                        }) : ""}
                    </div>

                    <div className="addnote">
                        <Tooltip placement="top" title="Add Note" >
                            <AddCircleRounded onClick={() => setCreateNote(true)} style={{fontSize: '3rem', color: 'red', cursor: 'pointer'}} />
                        </Tooltip>
                        <Tooltip placement="top" title="Close Secrets" >
                            <LockIcon onClick={() => dispatch(secretOff())} style={{fontSize: '3rem', color: 'black', cursor: 'pointer'}} />
                        </Tooltip>
                    </div>

                    {createNote ? <CreateSecretForm getMySecretNotes={getMySecretNotes} toggle={createNote} setToggle={setCreateNote} /> : null}
                    {isEdit ? <EditSecretForm getMySecretNotes={getMySecretNotes} toggle={isEdit} setToggle={setIsEdit} id={selectedID} myNotes={myNotes} /> : null }

                </div>
            </Fade> : <div className="loading">
            <CircularProgress/>
        </div> }
        </div>
    )

}