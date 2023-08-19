import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


import GameRoom from './GameRoom';
import CreateModal from "./CreateModal";
import { Routes,Route, Link } from "react-router-dom";

function GameRoomsSelections() {

  const gameRoomNames = ["Addition", "Subtraction", "Multiplication", "Division", "Are You Faster Than A Fifth Grader"];
  const gameRoomImages = ["./images/addition.png", "./images/subtraction.png", "./images/multiplication.png", "./images/all.png", "./images/all.png"];

  return (
    gameRoomNames.map((Title, idx) =>{
        return(
            <Card border="primary"  className='mt-3 ml-3' style={{ width: '30rem', marginLeft: "10px" }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card.Img variant="top" src={`${gameRoomImages[idx]}`} style = {{width: "50%"}}/>
                 </div>
                <Card.Body>
                    <Card.Title>{Title}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Link to="/MathProblems/1" className="custom-link">
                            <Button variant="primary"> Quick Join </Button>
                        </Link>
                        &nbsp;
                        <Link to="" className="custom-link">
                            <Button variant="success"> Join </Button>
                        </Link>
                        &nbsp;
                        <Link to="" className="custom-link">
                            <Button variant="danger"> Create </Button>               
                        </Link>
                </Card.Body>
                <CreateModal/>
            </Card>
        )
    } )
  );
}

export default GameRoomsSelections;


