import Form from 'react-bootstrap/Form';
import "./GameSettingsForm.css"

const GameSettingsForm = () =>{
    return (
        <>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Disabled input</Form.Label>
            <Form.Control className="label" id="disabledTextInput" placeholder="Disabled input" disabled  />
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
        </>
    )
}

export default GameSettingsForm;