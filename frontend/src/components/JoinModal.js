import "./JoinModal.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

const JoinModal = ({handleJoinModal}) =>{

    const ContentClick = (e) =>{
        e.stopPropagation();
    }

    const [roomInput, setRoomInput] = useState("");
    const [isNumbers, setIsNumbers] = useState(true);

    const handleInputChange = (e) =>{
        setRoomInput((prev) =>{
            //regex for numbers only
            let reg = new RegExp('^[0-9]+$');

            if (!reg.test(e.target.value)){
                setIsNumbers(false);
            }
            else{
                setIsNumbers(true);
            }

            return e.target.value
        });


    }

    return(
        <div className = "join-modal" onClick = {handleJoinModal}>
            <Card className = "join-content" onClick={(e)=>{ContentClick(e)}}>
                <Card.Body>
                    <Card.Title>Join Room</Card.Title>
                    <Form >
                        <fieldset>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">{"GameType"}</Form.Label>
                                <Form.Control id="disabledTextInput" placeholder="Disabled input" disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">Room ID: </Form.Label>
                                <Form.Control id="disabledTextInput" placeholder="Enter Room ID Here" onChange={handleInputChange}/>
                                {!isNumbers?<p style = {{color: "red"}}> Please enter a number!</p> : <></>}
                            </Form.Group>
                            <Button type="submit">Join</Button>
                        </fieldset>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );

}

export default JoinModal;