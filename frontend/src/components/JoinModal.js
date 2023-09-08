import "./JoinModal.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useData } from "../utilities/firebase";

const JoinModal = ({gameType, handleJoinModal}) =>{

    const ContentClick = (e) =>{
        e.stopPropagation();
    }

    //get room data from firebase
    const [rooms, error] = useData("/GameRooms");

    const [roomInput, setRoomInput] = useState("");
    const [isNumbers, setIsNumbers] = useState(true);

    const [isShake, setIsShake] = useState(false);
    const [roomExistError, setRoomExistError] = useState(true);
    const [roomMultiplayerError, setRoomMultiplayerError] = useState(true);

    const handleInputChange = (e) =>{
        setRoomMultiplayerError(true);
        setRoomMultiplayerError(true);

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

        if(!isNumbers 
            && ids.length !== 0 
            && rooms[ids[0]].PlayerMode === "Multiplayer"){
                
        }
        else{
            // the room exist and room multiplayer errors are mutally exclusive.
            if(ids.length === 0){
                setRoomExistError(false);
                setRoomMultiplayerError(true);
            }
            else{
                setRoomExistError(true);
                setRoomMultiplayerError(false);
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
                            {!roomExistError? <p className = "warning">Room does not exist!</p> : <></>}
                            {!roomMultiplayerError? <p className = "warning">The room exists, but it's not multiplayer!</p> : <></>}
                        </fieldset>
                    </Form>
                    <Button variant = "danger" onClick={handleSubmit}>Join</Button>
                </Card.Body>
            </Card>
        </div>
    );

}

export default JoinModal;