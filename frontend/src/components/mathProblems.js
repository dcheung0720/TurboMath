import { useState } from "react";
import AnswerSubmit from "./answerSubmission";
import { useData } from '../utilities/firebase.js';

const MathProblems = () => {
    const [number1, setNumber1] = useState(Math.floor(Math.random() * 12 + 1));
    const [number2, setNumber2] = useState(Math.floor(Math.random() * 12 + 1));

    const [ value, isLoading, error ] = useData('/');

    console.log(value);

    return (
        <div>
           what is {number1} x {number2} ?
           <AnswerSubmit number1 = {number1} number2 = {number2} setNumber1={setNumber1} setNumber2={setNumber2}/>
        </div>
    )

}



export default MathProblems;