import { useState } from "react";
import AnswerSubmit from "./AnswerSubmission";
import { useData } from '../utilities/firebase.js';

const MathProblems = () => {
    //get game room data
    const [ value, error ] = useData('/GameRooms/id');

    console.log(value)

    return (
        value? 
        <div>
           what is {value.Problems.number1} x {value.Problems.number2} ?
           <AnswerSubmit number1 = {value.Problems.number1} number2 = {value.Problems.number2}/>
        </div> : <></>
    )

}



export default MathProblems;