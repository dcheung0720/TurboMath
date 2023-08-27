import MathProblems from "./GameRoom";
import { useUserState } from "../utilities/firebase";
import GameRoomsSelections from "./GameRoomSelections";

const HomePage = () =>{
    const [user] = useUserState();

    return(
        user?
        <div style={{marginTop: "10vh"}}>
            <h1 style = {{marginBottom: 0, marginTop: "1vh"}}>Game Selections</h1>
            <div style={{display: "flex", justifyContent: "center", flexWrap : "wrap"}}>
                <div className = "SelectionContainer" style = {{width: "100%", height: "100vh", display: "flex",
                 flexWrap : "wrap", justifyContent: "center"}}>
                    <GameRoomsSelections/>
                </div>
            </div>
        </div>:
        <></>
    )
}



export default HomePage;