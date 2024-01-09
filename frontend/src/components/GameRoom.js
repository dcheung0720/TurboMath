import { useEffect, useState, useRef } from "react";
import AnswerSubmit from "./AnswerSubmission";
import { setData, useData } from '../utilities/firebase.js';
import { useUserState, removeData } from "../utilities/firebase.js";
import WaitingRoom from "./WaitingRoom";
import { useParams } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import MathProblem from "./MathProblem";
import GameOver from "./Gameover";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import "./GameRoom.css"

// door bell
// https://pixabay.com/sound-effects/search/doorbell/

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
    const [started, error2] = useData(gameRoomPath.concat("/Started"));
    const [delay, error3] = useData(gameRoomPath.concat("/Delay"));
    const [countDownVis, error4] =  useData(gameRoomPath.concat("/CountDownVis"));
    const [user] = useUserState();
    const [wrongQuestions, setWrongQuestions] = useState({});
    const [added, setAdded] = useState(false);

    const [intervalId, setintervalId] = useState(null);
    const [numPlayers, setNumPlayers] = useState(0);

    const doorbell = useRef();

    // once the game starts, update the database time by 1 second 
    useEffect(()=>{
        if(room && id){
            if (room.Started){
                const temp = setInterval(()=>{
                    if(room.TimeLeft >= 0){
                        // update the time in database
                        setData(gameRoomPath.concat("/TimeLeft"), room.TimeLeft --);
                    }
                }, 1000)
                setintervalId(temp);
            }
        }
    }, [started])

    // handle user leaving
    const handleUserLeave = () => {
        //if user exsits, remove the user from firebase
        if(user){
            clearInterval(intervalId);
            // if there is only one player left, destroy the room
            if(Object.keys(room.Players).length == 1){
                removeData(gameRoomPath);
            }
            else{
                removeData(gameRoomPath.concat(`/Players/${user.uid}`));
            }              
        }
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
    }, [room, user, intervalId]);
    // started? ^

    // update num players
    useEffect(()=>{
        if(room && doorbell.current){
            setNumPlayers((prev)=>{
                const numPlayer = Object.keys(room.Players).length;
                if(prev < numPlayer){
                    doorbell.current.play();
                }
                return numPlayer;
            })
        }
    }, [room, doorbell.current])


    useEffect(() =>{
        // if both room and user exists
        if (room && user){
            const playerStats = {
                name: user.displayName,
                score: 0,
                ready: true
            }

            // add it to firebase if the user is not already in the gameroom
            if (!Object.keys(room.Players).includes(user.uid) && !added){
                setData(`GameRooms/${id}/Players/${user.uid}`,playerStats);
                setAdded(true);
            }
        }

    }, [room, user, added])

      
    return (
        // if room exists, user is logged in, and user exists in the room, put stuff on the screen.
        room && user && room.Players[user.uid]?
            room.TimeLeft > 0 && room.Players[user.uid].ready?
            <div className = "game-content" style={{height: "80%"}}>   
                <div className = "PageContainer" style={{ opacity: !room.Started ? "0" : "1", transition: "all .2s"}}>           
                    <div className = "MathProblem" style={{fontSize: "80px", marginTop: room.PlayerMode === "Solo"? "70px" : "175px"}}>
                        <div className = "score">Score: {room.Players[user.uid].score}</div>
                        <MathProblem room = {room} wrongQuestions = {wrongQuestions} setWrongQuestions = {setWrongQuestions}></MathProblem>
                        {room.PlayerMode === "Multiplayer"? <LeaderBoard room = {room}></LeaderBoard> : <></>}
                    </div>
                    {/* only have the leader for multiplayer */}
                    {delay <= 0?  <div className="timer-wrapper">
                        <CountdownCircleTimer
                        isPlaying
                        duration={60}
                        colors="#A30000"
                        colorsTime={[10, 6, 3, 0]}
                        >
                        {RenderTime}
                        </CountdownCircleTimer>
                    </div>: <></>}
                </div> 
                <div className = "waitingContainer" style = {{top: 0,position : "absolute", opacity: !room.Started ? "1" : "0",
                    width: "100vw", fontSize: "70px", transition: "all .8s", display: room.Started? "none": "flex", justifyContent:"center",
                     alignItems: "center", marginTop: countDownVis? "225px": room.PlayerMode === "Solo"? "150px": "125px"}}>
                        <WaitingRoom id = {id}></WaitingRoom> 
                    <audio ref = {doorbell} id = "doorbell" controls autoplay hidden>
                        <source src = "../audio/doorbell.mp3" type = "audio/mp3"></source>
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
            :  <div><GameOver id = {id} user = {user} wrongQuestions = {wrongQuestions} setWrongQuestions = {setWrongQuestions}></GameOver></div>
        : <></>
    )

}



export default GameRoom;