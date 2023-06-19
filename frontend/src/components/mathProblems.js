import { useState } from "react";
import AnswerSubmit from "./answerSubmission";

const MathProblems = () => {
    const [number1, setNumber1] = useState(Math.floor(Math.random() * 12 + 1));
    const [number2, setNumber2] = useState(Math.floor(Math.random() * 12 + 1));

    return (
        <div>
           what is {number1} x {number2} 
           <AnswerSubmit number1 = {number1} number2 = {number2}/>
        </div>
    )

}



export default MathProblems;