import { useEffect, useState } from "react";
import AnswerSubmit from "./AnswerSubmission";
import { setData, useData } from '../utilities/firebase.js';
import { useUserState, removeData } from "../utilities/firebase.js";
import WaitingRoom from "./WaitingRoom";
import { useParams } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import MathProblem from "./MathProblem";

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