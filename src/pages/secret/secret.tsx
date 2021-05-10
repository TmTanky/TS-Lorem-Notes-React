import { FC, useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// Material-UI
import {CircularProgress, Fade, Tooltip} from '@material-ui/core'
import {AddCircleRounded} from '@material-ui/icons'
import LockIcon from '@material-ui/icons/Lock';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

// Interfaces
import { Istate } from '../../interfaces/state'
import { Inotes } from '../../interfaces/notes'

// Redux
import { secretOff } from '../../redux/actions/actions';

export const SecretHome: FC = () => {

    const dispatch = useDispatch()
    const userID = useSelector<Istate>(state => state.user._id)

    const [open, setOpen] = useState(false)
    const [myNotes, setMyNotes] = useState<Inotes[]>([])

    const getMySecretNotes = useCallback(async () => {

        try {

            const {data} = await axios.post<{data: Inotes[]}>(`http://localhost:8000/getusersecretnotes/${userID}`)
            setMyNotes(data.data)
            setOpen(true)

        } catch (err) {
            console.log(err)
        }

    },[userID])

    useEffect(() => {
        getMySecretNotes()
    },[getMySecretNotes])

    return (
        <div className="tae" >
            {open ? <Fade in={open} >
                <div className="mainhome">
                    <h1 style={{padding: '3rem 0rem', textAlign: 'center'}} > Secret Notes </h1>

                    <div className="mynotes">
                        {myNotes.length > 0 ? myNotes.map(item => {
                            return <div key={item._id} className="note">

                            <div className="isdone">
                                {item.isDone ? <div>
                                    <DeleteForeverIcon/>
                                    <CheckBoxIcon/>
                                </div> : <div>
                                    <EditIcon/> <CheckBoxOutlineBlankIcon style={{cursor: 'pointer'}}/>
                                </div> }
                            </div>

                                <h2 style={{marginBottom: '0.5rem', borderBottom: 'solid 1px', textDecoration: `${item.isDone ? 'line-through' : ""}`}} > {item.title} </h2>
                                <p style={{textDecoration: `${item.isDone ? 'line-through' : ""}`}} > {item.content} </p>
                            </div>
                        }) : ""}
                    </div>

                    <div className="addnote">
                        <Tooltip placement="top" title="Add Note" >
                            <AddCircleRounded style={{fontSize: '3.5rem', color: 'red', cursor: 'pointer'}} />
                        </Tooltip>
                        <Tooltip placement="top" title="Close Secrets" >
                            <LockIcon onClick={() => dispatch(secretOff())} style={{fontSize: '3.5rem', color: 'black', cursor: 'pointer'}} />
                        </Tooltip>
                    </div>
                </div>
            </Fade> : <div className="loading">
            <CircularProgress/>
        </div> }
        </div>
    )

}