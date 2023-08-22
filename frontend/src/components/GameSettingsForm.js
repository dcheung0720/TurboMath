import Form from 'react-bootstrap/Form';
import "./GameSettingsForm.css"
import { Button } from "react-bootstrap";
import { useState } from 'react';
import { setData, useData, useUserState } from '../utilities/firebase';
import { Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const GameSettingsForm = ({gameType}) =>{

    //navigator
    let navigate = useNavigate();

    //redirect id
    const [redirectId, setRedirectId] = useState(null);

    // set of states for forms
    const [playerMode, setPlayerMode] = useState("Solo");
    const [gameMode, setGameMode] = useState("Turbo");
    const [number1, setNumber1] = useState("1");
    const [number2, setNumber2] = useState("1");

    // gameroomData
    const [data, error] = useData('GameRooms');
    const [user] = useUserState();
    let roomIDs;
    
    if (data){
        roomIDs = Object.keys(data);
    }

    const CreateRoom = (e) =>{
        e.preventDefault();
        const id = FindId();
        const object = {
            "PlayerMode" : playerMode,
            "GameMode": gameMode,
            "Players": user.uid,
            "Difficulty1" : number1,
            "Difficulty2" : number2,
            "Problems" : {
                "number1": GenerateNumbers(number1),
                "number2": GenerateNumbers(number2)
            }, 
            "GameType": gameType,
            "Started": false
        }
        
        //upload to firebase
        setData(`GameRooms/${id}`,object);
        setRedirectId(id);
    }

    // redirect me once the user clicks create
    if(redirectId){
        navigate(`/MathProblems/${redirectId}`)
    }

    const GenerateNumbers = (numDigits) =>{
        console.log(numDigits)
        switch(numDigits){
            case "1":
                return Math.floor(Math.random() * 9 + 1);
            case "2":
                return Math.floor(Math.random() * 90 + 10);   
            case "3":        
                return Math.floor(Math.random() * 900 + 100);       
        }
    };

    const FindId = () =>{
        let id = Math.floor(Math.random() * 10000);
        // randomize until there isn't a match
        while(roomIDs.includes(id)){
            id = Math.floor(Math.random() * 10000);
        }

        return id;
    }

    const handleStateChange = (e, setState) =>{
        setState(e.target.value);
    };

    return (
        <Form>
          <fieldset>
            <Form.Group className="mb-3 d-flex align-items-center justify-content-center">
                <Form.Label htmlFor="disabledTextInput" className="mr-2 label-centered">GameType:</Form.Label>
                <Form.Control className="label" id="disabledTextInput" placeholder={gameType} disabled  />
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center justify-content-center" aria-label="Default select example">
                <Form.Label className="mr-2 label-centered"> Players: </Form.Label>
                <Form.Control className="label" as="select" value = {playerMode} onChange = {(e) => handleStateChange(e, setPlayerMode)}>
                    <option> Solo </option>
                    <option> Multiplayer </option>
                </Form.Control>        
            </Form.Group>
            
            <Form.Group className="mb-3 d-flex align-items-center justify-content-center">
                <Form.Label className="mr-2 label-centered">Difficulty: </Form.Label>
                <Form.Control className="label" as="select" value = {number1} onChange = {(e) => handleStateChange(e, setNumber1)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Form.Control>

                <span style={{margin: "2%"}}> Digits By </span>

                <Form.Control className="label" as="select"  value = {number2} onChange = {(e) => handleStateChange(e, setNumber2)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Form.Control>
                <span style={{margin: "2%"}}> Digits</span>          
            </Form.Group>

            <Button variant="btn btn-success" type = "submit" onClick = {(e)=>CreateRoom(e)} >Create</Button>
          </fieldset>
        </Form>
    )
}

export default GameSettingsForm;