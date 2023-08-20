import Form from 'react-bootstrap/Form';
import "./GameSettingsForm.css"
import { Button } from "react-bootstrap";
import { useState } from 'react';


const GameSettingsForm = ({GameMode}) =>{

    // set of states for forms
    const [mode, setMode] = useState("Solo");
    const [number1, setNumber1] = useState(1);
    const [number2, setNumber2] = useState(1);

    const CreateRoom = () =>{

    };

    console.log(mode);
    console.log(number1);
    console.log(number2)

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

            <Button variant="btn btn-success" type = "submit">Create</Button>
          </fieldset>
        </Form>
    )
}

export default GameSettingsForm;