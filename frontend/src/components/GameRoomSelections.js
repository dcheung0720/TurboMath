import "./GameRoomSelections.css"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import GameRoom from './GameRoom';
import CreateModal from "./CreateModal";
import JoinModal from "./JoinModal";
import { Routes,Route, Link, useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
import { useData } from "../utilities/firebase";
import { useUserState } from "../utilities/firebase";


// https://pixabay.com/sound-effects/search/error/

function GameRoomsSelections() {

  const gameRoomNames = ["Addition", "Subtraction", "Multiplication", "Division"];
  const gameRoomImages = ["./images/addition.png", "./images/subtraction.png", "./images/multiplication.png", "./images/all.png"];

  const [user] = useUserState();

  const [openModal, setOpenModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [rooms, error] = useData("/GameRooms");

  // errors
  const [quickJoinError, setQuickJoinError] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [gameType, setGameType] = useState("Addition"); 
  const errorSoundRef = useRef();

  const ChangeModal = (e, gameType) =>{
    setGameType(gameType);
    setOpenModal(!openModal);
    setQuickJoinError(false);
  }  

  const handleJoinModal = (e, gameType) =>{
    setGameType(gameType);
    setJoinModal((prev) => !prev);
    setQuickJoinError(false);
  };

  let navigate = useNavigate();

  const findQuickJoinRoom = (e, gameType) =>{

        setGameType(gameType);

        if(rooms){
            // valid rooms are rooms that matches Game type,
            // hasn't started
            // and it's multiplayer
            const valid_rooms = Object.entries(rooms).filter(room => 
                                        room[1].GameType === gameType
                                        && !room[1].Started
                                        && room[1].PlayerMode === "Multiplayer")
                                        .map(room =>
                                            room[0]
                                        );
            
            // no rooms are available
            if(valid_rooms.length === 0){
                // show error message
                setQuickJoinError(true);
                
                //shake the card
                setIsShake(true);

                setTimeout(() =>{
                    setIsShake(false);
                }, 500);

                // play error sound
                errorSoundRef.current.play();
            }
            else{
                const rand_id = valid_rooms[Math.floor(Math.random() * valid_rooms.length)];
                navigate(`/MathProblems/${rand_id}`);
            }
        }
  };


  return ( user &&
    <div style={{height: "100%"}}>
        <div className = "selectionContainer">
                <audio ref = {errorSoundRef}  id = "id" controls hidden>
                    <source src = "../audio/error.mp3" type = "audio/mp3"></source>
                    Your browser does not support the audio element.
                </audio>
                {gameRoomNames.map((title, idx) =>{
                    return(
                        <Card id = {isShake && gameType === title? "shake": "null"} className = "gameroom-selections"
                        style={{ backgroundImage: `url("./images/Nightsky.png")`, borderRadius: "10%" }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Card.Img variant="top" src={`${gameRoomImages[idx]}`} style = {{marginTop: "30px", width: "150px", height: "150px"}}/>
                            </div>
                            <Card.Body style = {{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <div>
                                    <Card.Title style = {{fontSize: "50px"}}>{title}</Card.Title>
                                    <Card.Text>
                                        {/* Some quick example text to build on the card title  */}
                                    </Card.Text>

                                    {quickJoinError && gameType === title && 
                                    <Card.Text className = "warning">
                                        No room is available for quick join!
                                    </Card.Text>}

                                    <div className = "btn-group">
                                        <span>
                                            <Button onClick = {(e) => ChangeModal(e, title)} variant="success"> Create </Button>               
                                        </span>
                                        &nbsp;
                                        <span>
                                            <Button onClick={(e) => handleJoinModal(e, title)} variant="danger"> Join </Button>
                                        </span>
                                        &nbsp;
                                        <span>
                                            <Button onClick = {(e) => findQuickJoinRoom(e, title)} variant="primary"> Quick Join </Button>
                                        </span>
                                    </div>
                                </div>
                            </Card.Body>                           
                        </Card>
                    )
                })}
                {/* open modal if the modal is true */}
                {openModal === true? <CreateModal gameType = {gameType} ChangeModal = {ChangeModal}/> : <></>}  
                {/* open joinmodal if the modal is true */}
                {joinModal === true? <JoinModal gameType = {gameType} handleJoinModal = {handleJoinModal}/> : <></>}
        </div>
    </div>);

}


export default GameRoomsSelections;


