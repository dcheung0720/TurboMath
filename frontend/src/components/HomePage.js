import MathProblems from "./GameRoom";
import { useUserState } from "../utilities/firebase";
import GameRoomsSelections from "./GameRoomSelections";

const HomePage = () =>{
    const [user] = useUserState();

    return(
        user?
        <>
            <h1>Welcome, {user.displayName} !</h1>
            <div style={{display: "flex", justifyContent: "center", flexWrap : "wrap"}}>
                <div className = "SelectionContainer" style = {{width: "70%", display: "flex", flexWrap : "wrap", justifyContent: "center"}}>
                    <GameRoomsSelections/>
                </div>
            </div>
        </>:
        <></>
    )


}



export default HomePage;