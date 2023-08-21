import Form from 'react-bootstrap/Form';
import "./GameSettingsForm.css"
import { Button } from "react-bootstrap";
import { useState } from 'react';
import { setData, useData, useUserState } from '../utilities/firebase';
import { Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const GameSettingsForm = ({GameMode}) =>{

    //navigator
    let navigate = useNavigate();

    //redirect id
    const [redirectId, setRedirectId] = useState(null);

    // set of states for forms
    const [mode, setMode] = useState("Solo");
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
            "Mode" : mode,
            "Players": user.uid,
            "Difficulty1" : number1,
            "Difficulty2" : number2,
            "Problems" : {
                "number1": GenerateNumbers(number1),
                "number2": GenerateNumbers(number2)
            }, 
            "Type": GameMode,
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
                <Form.Label htmlFor="disabledTextInput" className="mr-2 label-centered">Type:</Form.Label>
                <Form.Control className="label" id="disabledTextInput" placeholder={GameMode} disabled  />
            </Form.Group>

            <Form.Group className="mb-3" aria-label="Default select example">
                <Form.Label>Mode: </Form.Label>
                <Form.Select value = {mode} onChange = {(e) => handleStateChange(e, setMode)}>
                    <option> Solo </option>
                    <option> Multiplayer </option>
                </Form.Select>        
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Difficulty: </Form.Label>
                <Form.Select value = {number1} onChange = {(e) => handleStateChange(e, setNumber1)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Form.Select>

                <span> Digits By </span>

                <Form.Select value = {number2} onChange = {(e) => handleStateChange(e, setNumber2)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Form.Select>
                <span>Digits</span>          
            </Form.Group>

            <Button variant="btn btn-success" type = "submit" onClick = {(e)=>CreateRoom(e)} >Create</Button>
          </fieldset>
        </Form>
    )
}

export default GameSettingsForm;