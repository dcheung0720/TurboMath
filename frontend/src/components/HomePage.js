
import { Routes,Route, Link } from "react-router-dom";
import MathProblems from "./GameRoom";
import { useUserState } from "../utilities/firebase";

const HomePage = () =>{
    const [user] = useUserState();

    return(
        user?
        <>
            <h1>Welcome, {user.displayName} !</h1>
            <Link to= '/MathProblems/1'> Multiplication Room </Link>
        </>:
        <></>
    )


}



export default HomePage;