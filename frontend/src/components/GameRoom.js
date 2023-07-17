import { useEffect, useState } from "react";
import AnswerSubmit from "./AnswerSubmission";
import { setData, useData } from '../utilities/firebase.js';
import { useUserState } from "../utilities/firebase.js";
import { useParams } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import MathProblem from "./MathProblem";

const GameRoom = () => {
    //get game room data
    const { id } = useParams();

    const [ room, error ] = useData(`/GameRooms/${id}`);
    const [user] = useUserState();

    console.log(room)

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
            <div className = "MathProblem">
                <div>Score: {room.Players[user.uid].score}</div>
                <MathProblem room = {room}></MathProblem>
                <AnswerSubmit number1 = {room.Problems.number1} number2 = {room.Problems.number2}/>
            </div>
            <LeaderBoard room = {room}></LeaderBoard>
        </div> : <></>
    )

}



export default GameRoom;