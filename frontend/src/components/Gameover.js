import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./GameOver.css"
import { useEffect, useState } from 'react';


const GameOver = () =>{

    const [gameOverTimer, setGameOverTimer] = useState(2);

    const [intervalID, setIntervalID] = useState(null);

    useEffect(()=>{
        let temp = setInterval(()=>{
            setGameOverTimer(gameOverTimer-1);
        },1000)
        setIntervalID(temp);

    },[gameOverTimer])

    return(
        <div className = "gameOver">
            <div className='gameOver-block'>
                <h1>GAME OVER!</h1>
            </div>
            <div className='gameOver-content' style = {{opacity: gameOverTimer > 0? "0": "1", transition: "all 1s"}}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
        </div>
    </div>)


};


export default GameOver;