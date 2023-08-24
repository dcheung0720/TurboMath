import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./GameOver.css"
import { useEffect, useState } from 'react';
import { removeData, setData, useData } from '../utilities/firebase';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";



const GameOver = ({id, user}) =>{

    const [gameOverTimer, setGameOverTimer] = useState(2);

    const [intervalID, setIntervalID] = useState(null);

    //gameRoomPath
    const gameRoomPath = `/GameRooms/${id}`;

    // gameroomData
    const [data, error] = useData('GameRooms');

    const [room, error1] = useData(`/GameRooms/${id}`);

    const [player, error2] = useData(`/GameRooms/${id}/Players/${user.uid}`);

    let navigate = useNavigate();

    let roomIDs;
    
    //get all the ids in the room
    if (data){
        roomIDs = Object.keys(data);
    }

    // handle user leaving
    const handleUserLeave = () => {
        //if user exsits, remove the user from firebase
        if(user){
            clearInterval(intervalID);   
            setIntervalID(null);
            // if there is only one player left, destroy the room
            if(Object.keys(room.Players).length == 1){
                removeData(gameRoomPath);
            }
            else{
                removeData(gameRoomPath.concat(`/Players/${user.uid}`));
            }              
        }
        console.log('User is leaving or closing the window.');
    };

    // time it takes for the game result screen to show up.
    useEffect(()=>{
        let temp = setInterval(()=>{
            setGameOverTimer(gameOverTimer-1);
        },1000)
        setIntervalID(temp);

    },[gameOverTimer])

    //play gameover sounds when it first mounts
    useEffect(()=>{
        playAudio("gameOver");
    },[])

    // button functions
    const GoHome = () =>{
        // remove the user
        handleUserLeave();
        navigate('../');
    }

    //play audio
    const playAudio = (id) =>{
        //get correct audio element and play the sound
        document.getElementById(id).volume = .2;
        document.getElementById(id).play();
        console.log(document.getElementById(id))
    }

    const NewGame = (e) =>{
        e.preventDefault();

        // create the exact same object
        const object = {
            "PlayerMode" : room.PlayerMode,
            "GameMode": room.GameMode,
            "Players": room.Players,
            "Difficulty1" : room.Difficulty1,
            "Difficulty2" : room.Difficulty2,
            "Problems" : {
                "number1": GenerateNumbers(room.Difficulty1),
                "number2": GenerateNumbers(room.Difficulty2)
            }, 
            "GameType": room.GameType,
            "Started": false,
            "TimeLeft": 3
        }
        
        //upload to firebase
        setData(`GameRooms/${id}`,object);
        
        navigate(`../MathProblems/${id}`);
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

    return(
        <div className = "gameOver">
            <audio id = "gameOver" controls autoplay hidden>
                        <source src="../audio/gameover.wav" type="audio/wav"></source>
                    Your browser does not support the audio element.
                    </audio> 
            <div className='gameOver-block' style = {{opacity: gameOverTimer > 0? "1": "0", transition: "all 1s"}}>
                <h1>TIMES UP!</h1>
            </div>
            {room && player? <div className='gameOver-content' style = {{opacity: gameOverTimer > 0? "0": "1", transition: "all 1s"}}>
                <Card style={{ width: '40rem', height: '40rem', backgroundColor: "#32386D", borderColor: "#6d6732", borderWidth: "1em"}}>
                    <Card.Body>
                        <Card.Title style={{fontSize: "2vw"}}>Game Results</Card.Title>
                        <Table striped bordered style={{ textAlign: 'center', color:"white", fontSize: "1.5vw" }}>
                            <tbody>
                                <tr>
                                    <td>Player Mode: </td>
                                    <td>{room.PlayerMode}</td>
                                </tr>
                                <tr>
                                    <td>Difficulty :</td>
                                    <td>{room.Difficulty1} digit by {room.Difficulty2} digit</td>
                                </tr>
                                <tr>
                                    <td>Game Mode :</td>
                                    <td colSpan={2}> {room.GameMode}</td>
                                </tr>
                                <tr>
                                    <td style = {{color: "#B66161"}}>Score :</td>
                                    <td colSpan={3}> {player.score}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                    <div className = "btn-group">
                        <Button onClick = {()=> GoHome()}  variant="primary">Return Home</Button>
                        <Button onClick = {(e)=> NewGame(e)} variant="primary">Play Again</Button>
                    </div>
                </Card>
            </div> : <></>}
           
    </div>)


};


export default GameOver;