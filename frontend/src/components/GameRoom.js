import { useEffect, useState } from "react";
import AnswerSubmit from "./AnswerSubmission";
import { setData, useData } from '../utilities/firebase.js';
import { useUserState } from "../utilities/firebase.js";
import { useParams } from "react-router-dom";

const GameRoom = () => {
    //get game room data
    const { id } = useParams();

    const [ room, error ] = useData(`/GameRooms/${id}`);
    const [user] = useUserState();


    useEffect(() =>{
        // if both room and user exists
        if (room && user){
            const playerStats = {
                name: user.displayName,
                score: 0
            }

            if (!Object.keys(room.Players).includes(user.uid)){
                setData(`GameRooms/${id}/Players`,playerStats)
            }
        }

    }, [room])

    return (
        // if room exists, user is logged in, and user exists in the room, put stuff on the screen.
        room && user && room.Players[user.uid]?
        <div className = "PageContainer" style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>           
            <div className = "MathProblem">
                <div>Score: {room.Players[user.uid].score}</div>
                what is {room.Problems.number1} x {room.Problems.number2} ?
                <AnswerSubmit number1 = {room.Problems.number1} number2 = {room.Problems.number2}/>
            </div>

            <div className = "LeaderBoard">
                    <table class="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                    {Object.entries(room.Players).map((player, index) => {
                        return <tr>
                            <th scope="row"> {index + 1} </th>
                            <td>{player[1].name}</td>
                            <td>{player[1].score}</td>
                        </tr>
                    })}
                    </tbody>
                  </table>
            </div>
        </div> : <></>
    )

}



export default GameRoom;