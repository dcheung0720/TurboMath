import { useEffect, useState } from "react";
import AnswerSubmit from "./AnswerSubmission";
import { useData } from '../utilities/firebase.js';
import { useUserState } from "../utilities/firebase.js";
import { useParams } from "react-router-dom";

const MathProblems = () => {
    //get game room data
    const { id } = useParams();

    const [ room, error ] = useData(`/GameRooms/${id}`);
    const [user] = useUserState();


    return (
        room && user?
        <div>
            <div>Score: {Object.entries(room.Players).filter(x => x[0] == user.uid)[0][1]}</div>
            what is {room.Problems.number1} x {room.Problems.number2} ?
            <AnswerSubmit number1 = {room.Problems.number1} number2 = {room.Problems.number2}/>
        </div> : <></>
    )

}



export default MathProblems;