import "./JoinModal.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from "react";
import { useData } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";


const JoinModal = ({gameType, handleJoinModal}) =>{

    const ContentClick = (e) =>{
        e.stopPropagation();
    }

    let navigate = useNavigate();

    //get room data from firebase
    const [rooms, error] = useData("/GameRooms");

    const [roomInput, setRoomInput] = useState("");
    const [isNumbers, setIsNumbers] = useState(true);

    //errors
    const [isShake, setIsShake] = useState(false);
    const [roomExistError, setRoomExistError] = useState(false);
    const [roomMultiplayerError, setRoomMultiplayerError] = useState(false);
    const [gameTypeError, setGameTypeError] = useState(false);
    const [startedError, setStartedError] = useState(false);
    const errorSoundRef = useRef()

    const handleInputChange = (e) =>{
        setRoomMultiplayerError(false);

        setRoomInput((prev) =>{
            //regex for numbers only
            let reg = new RegExp('^[0-9]*$');

            if (!reg.test(e.target.value)){
                setIsNumbers(false);
            }
            else{
                setIsNumbers(true);
            }

            return e.target.value
        });
    };


    const handleSubmit = () =>{

        const ids = Object.keys(rooms).filter(id => id === roomInput);

        // if the palyer entered a number, the id exists, the game mode is multiplayer
        // and the game hasn't started
        if(isNumbers 
            && ids.length !== 0 
            && rooms[ids[0]].GameType === gameType
            && rooms[ids[0]].PlayerMode === "Multiplayer"
            && !rooms[ids[0]].started){
               navigate(`/MathProblems/${ids[0]}`)
        }
        else{
            // the room exist and room multiplayer errors are mutally exclusive.
            errorSoundRef.current.play();
            if(ids.length === 0){
                setRoomExistError(true);
                setRoomMultiplayerError(false);
                setGameTypeError(false);
                setStartedError(false);
            }
            else if(rooms[ids[0]].started){
                setStartedError(true);
                setGameTypeError(false);
                setRoomMultiplayerError(false);
                setRoomExistError(false);
            }
            else if(rooms[ids[0]].GameType !== gameType){
                setGameTypeError(true);
                setRoomMultiplayerError(false);
                setRoomExistError(false);
                setStartedError(false);
            }
            else{
                setRoomMultiplayerError(true);
                setRoomExistError(false);
                setGameTypeError(false);
                setStartedError(false);
            }

            // error shake
            setIsShake(true);

            setTimeout(()=>{
                setIsShake(false);
            }, 500);
        }
    };


    return(
        <div className = "join-modal" onClick = {handleJoinModal}>
            <audio ref = {errorSoundRef}  id = "id" controls hidden autoPlay>
                <source src = "../audio/error.mp3" type = "audio/mp3"></source>
                Your browser does not support the audio element.
            </audio>
            <Card id = {isShake? "shake" : "null"} className = "join-content" onClick={(e)=>{ContentClick(e)}}>
                <Card.Body>
                    <Card.Title>Join Room</Card.Title>
                    <Form style = {{margin: "10px"}}>
                        <fieldset>
                            <Form.Group style = {{display: "flex" , alignItems: "center"}} className="mb-3">
                                <Form.Label style = {{margin: "10px"}} htmlFor="disabledTextInput">{"GameType: "}</Form.Label>
                                <Form.Control style={{textAlign: "center"}} id="disabledTextInput" placeholder= {gameType} disabled />
                            </Form.Group>
                            <Form.Group  style = {{display: "flex" , alignItems: "center"}} lassName="mb-3">
                                <Form.Label style = {{width : "70px", margin: "10px"}} htmlFor="disabledTextInput">Room-ID: </Form.Label>
                                <Form.Control style={{textAlign: "center", color: "black"}} id="disabledTextInput" placeholder="Enter Room ID Here" onChange={handleInputChange}/>
                            </Form.Group>
                            {!isNumbers?<p className = "warning"> Please enter a number!</p> : <></>}
                            {startedError? <p className = "warning">Game already started!</p> : <></>}
                            {roomExistError? <p className = "warning">Room does not exist!</p> : <></>}
                            {gameTypeError? <p className = "warning">Room exists, but the game type does not match!</p> : <></>}
                            {roomMultiplayerError? <p className = "warning">The room exists, but it's not multiplayer!</p> : <></>}
                        </fieldset>
                    </Form>
                    <Button variant = "danger" onClick={handleSubmit}>Join</Button>
                </Card.Body>
            </Card>
        </div>
    );

}

export default JoinModal;