import "./GameRoomSelections.css"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import GameRoom from './GameRoom';
import CreateModal from "./CreateModal";
import { Routes,Route, Link } from "react-router-dom";
import { useState } from 'react';


function GameRoomsSelections() {

  const gameRoomNames = ["Addition", "Subtraction", "Multiplication", "Division", "Are You Faster Than A Fifth Grader"];
  const gameRoomImages = ["./images/addition.png", "./images/subtraction.png", "./images/multiplication.png", "./images/all.png", "./images/all.png"];

  const [openModal, setOpenModal] = useState(false);
  const [gameType, setGameType] = useState("Addition"); 

  const ChangeModal = (e, gameType) =>{
    setGameType(gameType);
    setOpenModal(!openModal);
  }  


  return (<>
    {gameRoomNames.map((Title, idx) =>{
        return(
            <Card border="primary"  className='mt-3 ml-3'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card.Img variant="top" src={`${gameRoomImages[idx]}`} style = {{marginTop: "3%", width: "20%", height: "90%"}}/>
                 </div>
                <Card.Body style = {{height: "100%", width: "100%"}}>
                    <Card.Title style = {{fontSize: "100%"}}>{Title}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title 
                    </Card.Text>
                    <div className = "btn-group">
                        <Link to="/MathProblems/1" className="custom-link">
                            <Button variant="primary"> Quick Join </Button>
                        </Link>
                        &nbsp;
                        <Link to="" className="custom-link">
                            <Button variant="success"> Join </Button>
                        </Link>
                        &nbsp;
                        <Link to="" className="custom-link">
                            <Button onClick = {(e) => ChangeModal(e, Title)} variant="danger"> Create </Button>               
                        </Link>
                    </div>
                </Card.Body>                           
            </Card>
        )
    })}
    {/* open modal if the modal is true */}
    {openModal === true? <CreateModal gameType = {gameType} ChangeModal = {ChangeModal}/> : <></>}  
  </>);

}


export default GameRoomsSelections;


