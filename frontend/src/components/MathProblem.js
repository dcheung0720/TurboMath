

const MathProblem = ({room}) =>{
    return(
        <div>What is {room.Problems.number1}
        {room.Type === "Multiplication" ? <>x</>
        : room.Type === "Addition"? <>+</>:
        room.Type === "Subtraction"? <>-</>:
        <>÷</> }
        {room.Problems.number2}</div>
    )
};



export default MathProblem;