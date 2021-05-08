import {FC, useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

// Interfaces
import { Istate } from '../../interfaces/state'
import { Inotes } from '../../interfaces/notes'

// CSS
import './home.css'

export const HomePage: FC = () => {

    const userID = useSelector<Istate>(state => state.user._id)
    const [myNotes, setMyNotes] = useState<Inotes[]>([])

    const getMyNotes = useCallback(async () => {

        try {

            const {data} = await axios.post<{data: Inotes[]}>(`http://localhost:8000/getusernotes/${userID}`)

            if (data.data) {
                setMyNotes(data.data)
            }
            
        } catch (err) {
            console.log(err)
        }

    },[userID])

    useEffect(() => {
        getMyNotes()
    },[getMyNotes])

    return (
        <div className="homebox" >
            <h1> My Notes </h1>

            {myNotes.length > 0 ? myNotes.map(item => {
                return <div key={item._id} className="note" >
                    <h2> {item.title} </h2>
                    <p> {item.content} </p>
                </div>
            }): ""}

        </div>
    )

}