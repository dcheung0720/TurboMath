import { useEffect, useState } from "react";
import AnswerSubmit from "./AnswerSubmission";
import { setData, useData } from '../utilities/firebase.js';
import { useUserState, removeData } from "../utilities/firebase.js";
import { useParams } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import MathProblem from "./MathProblem";

const GameRoom = () => {
    //get game room data
    const { id } = useParams();

    //gameRoomPath
    const gameRoomPath = `/GameRooms/${id}`;

    const [ room, error ] = useData(gameRoomPath);
    const [user] = useUserState();

    console.log(room)

    // handle user leaving
    const handleUserLeave = () => {
        //if user exsits, remove the user from firebase
        if(user){
            removeData(gameRoomPath.concat(`/Players/${user.uid}`))
        }
        console.log('User is leaving or closing the window.');
    };
    
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            handleUserLeave();
            // Note: Returning a string will prompt a confirmation dialog in some older browsers.
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    useEffect(() =>{
        // if both room and user exists
        if (room && user){
            const playerStats = {
                name: user.displayName,
                score: 0
            }

            // add it to firebase if the user is not already in the gameroom
            if (!Object.keys(room.Players).includes(user.uid)){
                setData(`GameRooms/${id}/Players/${user.uid}`,playerStats)
            }
        }

    }, [room])

    return (
        // if room exists, user is logged in, and user exists in the room, put stuff on the screen.
        room && user && room.Players[user.uid]?
        <div className = "PageContainer" style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>           
            <div className = "MathProblem" style={{fontSize: "150px"}}>
                <div>Score: {room.Players[user.uid].score}</div>
                <MathProblem room = {room}></MathProblem>
            </div>
            <LeaderBoard room = {room}></LeaderBoard>
        </div> : <></>
    )

}



export default GameRoom;