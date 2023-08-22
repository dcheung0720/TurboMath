import LeaderBoard from "./LeaderBoard";
import AnswerSubmit from "./AnswerSubmission";
import "./MathProblem.css"

const MathProblem = ({room}) =>{
    return(
        <div className = "problem" style={{width: "1000px"}}>
            <div>What is {room.Problems.number1}
                {room.GameType === "Multiplication" ? <>x</>
                : room.GameType === "Addition"? <>+</>:
                room.GameType === "Subtraction"? <>-</>:
                <>÷</> }
                {room.Problems.number2}?
            </div>
            <AnswerSubmit number1 = {room.Problems.number1} number2 = {room.Problems.number2}
            difficulty1 = {room.Difficulty1} difficulty2 = {room.Difficulty2}/>
        </div>
        
    )
};



export default MathProblem;