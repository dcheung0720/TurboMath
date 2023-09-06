import MathProblems from "./GameRoom";
import { useUserState } from "../utilities/firebase";
import GameRoomsSelections from "./GameRoomSelections";
import "./HomePage.css"

const HomePage = () =>{
    const [user] = useUserState();

    return(
        user?
        <div style={{height: "100%"}}>
            {/* <h1 style = {{marginBottom: 0, marginTop: "1vh"}}>Game Selections</h1> */}
            <div className = "selectionContainer">
                <GameRoomsSelections/>
            </div>
        </div>:
        <></>
    )
}



export default HomePage;