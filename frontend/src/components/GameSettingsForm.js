import Form from 'react-bootstrap/Form';
import "./GameSettingsForm.css"
import { Button } from "react-bootstrap";

const GameSettingsForm = ({GameMode}) =>{
    return (
        <Form>
          <fieldset>
            <Form.Group className="mb-3 d-flex align-items-center justify-content-center">
                <Form.Label htmlFor="disabledTextInput" className="mr-2 label-centered">Mode:</Form.Label>
                <Form.Control className="label" id="disabledTextInput" placeholder={GameMode} disabled  />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Difficulty: </Form.Label>
                <Form.Select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </Form.Select>

                <span> Digits By </span>

                <Form.Select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </Form.Select>
                <span>Digits</span>          
            </Form.Group>
            <Button variant="btn btn-success">Create</Button>
          </fieldset>
        </Form>
    )
}

export default GameSettingsForm;