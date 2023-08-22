import { useEffect, useState, useRef } from "react";
import AnswerSubmit from "./AnswerSubmission";
import { setData, useData } from '../utilities/firebase.js';
import { useUserState, removeData } from "../utilities/firebase.js";
import WaitingRoom from "./WaitingRoom";
import { useParams } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import MathProblem from "./MathProblem";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import "./GameRoom.css"

const RenderTime = ({ remainingTime }) => {
    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);
    const [, setOneLastRerender] = useState(0);
  
    if (currentTime.current !== remainingTime) {
      isNewTimeFirstTick.current = true;
      prevTime.current = currentTime.current;
      currentTime.current = remainingTime;
    } else {
      isNewTimeFirstTick.current = false;
    }
  
    // force one last re-render when the time is over to tirgger the last animation
    if (remainingTime === 0) {
      setTimeout(() => {
        setOneLastRerender((val) => val + 1);
      }, 20);
    }
  
    const isTimeUp = isNewTimeFirstTick.current;
  
    return (
      <div className="time-wrapper">
        <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
          {remainingTime}
        </div>
        {prevTime.current !== null && (
          <div
            key={prevTime.current}
            className={`time ${!isTimeUp ? "down" : ""}`}
          >
            {prevTime.current}
          </div>
        )}
      </div>
    );
};

const GameRoom = () => {
    //get game room data
    const { id } = useParams();

    //gameRoomPath
    const gameRoomPath = `/GameRooms/${id}`;

    const [ room, error ] = useData(gameRoomPath);
    const [user] = useUserState();

    console.log(room)

    // handle user leaving
    const handleUserLeave = () => {
        //if user exsits, remove the user from firebase
        if(user){
            // if there is only one player left, destroy the room
            if(Object.keys(room.Players).length == 1){
                removeData(gameRoomPath)
            }
            else{
                removeData(gameRoomPath.concat(`/Players/${user.uid}`));
            }         
        }
        console.log('User is leaving or closing the window.');
    };
    
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            handleUserLeave();
            // Note: Returning a string will prompt a confirmation dialog in some older browsers.
            event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [room, user]);

    useEffect(() =>{
        // if both room and user exists
        if (room && user){
            const playerStats = {
                name: user.displayName,
                score: 0
            }

            // add it to firebase if the user is not already in the gameroom
            if (!Object.keys(room.Players).includes(user.uid)){
                setData(`GameRooms/${id}/Players/${user.uid}`,playerStats)
            }
        }

    }, [room])
      
    return (
        // if room exists, user is logged in, and user exists in the room, put stuff on the screen.
        room && user && room.Players[user.uid]?
            <div>   
                <div className = "PageContainer" style={{display: "flex", justifyContent: "center",
                 marginTop: "20px", opacity: !room.Started ? "0" : "1", transition: "all .2s" }}>           
                    <div className = "MathProblem" style={{fontSize: "150px"}}>
                        <div>Score: {room.Players[user.uid].score}</div>
                        <MathProblem room = {room}></MathProblem>
                    </div>
                    {/* only have the leader for multiplayer */}
                    <div className="timer-wrapper">
                        <CountdownCircleTimer
                        isPlaying
                        duration={10}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[10, 6, 3, 0]}
                        >
                        {RenderTime}
                        </CountdownCircleTimer>
                    </div>
                    {room.Mode === "Multiplayer"? <LeaderBoard room = {room}></LeaderBoard> : <></>}
                </div> 
                <div style = {{top: 0,position : "absolute", opacity: !room.Started ? "1" : "0", 
                    height: "85vh", width: "100vw", fontSize: "70px",
                    transition: "all .8s", display: room.Started? "none": "flex", justifyContent:"center", alignItems: "center" }}>
                        <WaitingRoom id = {id}></WaitingRoom> 
                </div>
            </div>
        : <></>
    )

}



export default GameRoom;