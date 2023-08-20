import "./CreateModal.css"
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';

const CreateModal = ({ChangeModal}) =>{

    const ContentClick = (e) =>{
        e.stopPropagation();
    }
    
    // const closeButton = () =>{
    //   return(
    //     <FontAwesomeIcon icon={faX} />
    //   )
    // }
    
    return (
        <div
          className="modalBackground" onClick={() => ChangeModal()}
          style={{ display: 'block'}}
        >
          <Modal.Dialog className="modalContent" onClick={(e) => ContentClick(e)}>
            <Modal.Header className="modalHeaderCenter" > 
              <Modal.Title>Game Room Settings</Modal.Title>         
            </Modal.Header>
    
            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>
    
            <Modal.Footer className = "buttonSubmit">
              <Button variant="primary">Submit</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      );  
}

export default CreateModal;