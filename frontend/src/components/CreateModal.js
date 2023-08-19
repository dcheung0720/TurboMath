import "./CreateModal.css"
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const CreateModal = ({ChangeModal}) =>{
    return (
        <div
          className="modalBackground" onClick={() => ChangeModal()}
          style={{ display: 'block'}}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      );  
}

export default CreateModal;