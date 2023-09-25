import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState, useRef } from 'react';
import { removeData, setData, useData } from '../utilities/firebase';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import "./GameOver.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faUserGroup, faUser, faRocket, faGamepad,
     faSignal, faCheck, faXmark, faDice, faSquarePollVertical
     } from '@fortawesome/free-solid-svg-icons';



const GameOver = ({id, user, wrongQuestions, setWrongQuestions}) =>{

    const [gameOverTimer, setGameOverTimer] = useState(2);

    const [intervalID, setIntervalID] = useState(null);

    //gameRoomPath
    const gameRoomPath = `/GameRooms/${id}`;

    // gameroomData
    const [data, error] = useData('GameRooms');

    const [room, error1] = useData(`/GameRooms/${id}`);

    const [player, error2] = useData(`/GameRooms/${id}/Players/${user.uid}`);

    //user data
    const [users, error3] = useData(`/Users/`);

    // Inside your GameOver component
    const [statsUpdated, setStatsUpdated] = useState(false);

    const intervalId = useRef();

    let statPath;

    // player stats path
    if(room){
        statPath = `Users/${user.uid}/${room.GameType}/${room.GameMode}`;
    }

    const [stats, error4] = useData(statPath);

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
        intervalId.current = setInterval(()=>{
            setGameOverTimer(gameOverTimer => gameOverTimer-1);
        },1000)
    },[])

    // if gameOverTimer < 0, clear the interval
    useEffect(()=>{
        if(gameOverTimer < 0){
            clearInterval(intervalId.current);
        }
    }, [gameOverTimer]);

    //play gameover sounds when it first mounts
    useEffect(()=>{
        playAudio("gameOver");
    }, [])

    useEffect(()=>{
        let path;
        if(player && room && stats && users && wrongQuestions && !statsUpdated){
            //  update the player's stats
             // determining difficulty
            if(room.Difficulty1 == "1" &&  room.Difficulty2 == "1"){
                path = "1x1";
            }
            else if (room.Difficulty1 == "1" &&  room.Difficulty2 == "2"
            || room.Difficulty1 == "2" &&  room.Difficulty2 == "1"){
                path = "2x1";
            }
            else if (room.Difficulty1 == "1" &&  room.Difficulty2 == "3"
            || room.Difficulty1 == "3" &&  room.Difficulty2 == "1"){
                path = "3x1";
            }
            else if (room.Difficulty1 == "2" &&  room.Difficulty2 == "2"){
                path = "2x2";
            }
            else if (room.Difficulty1 == "2" &&  room.Difficulty2 == "3"
            || room.Difficulty1 == "3" &&  room.Difficulty2 == "2"){
                path = "3x2";
            }
            else if (room.Difficulty1 == "3" &&  room.Difficulty2 == "3"){
                path = "3x3";
            }
            
            if(room.GameMode === "Turbo"){
                // undo infinite loop
                setStatsUpdated(true);

                const newHS = player.score > stats[path].HS? player.score : stats[path].HS;

                const numGames = stats[path].GamesPlayed + 1;

                const totalScore = stats[path].TotalScore + player.score;
                
                //update HS
                setData(statPath.concat("/" + path).concat("/HS"), newHS)

                // update GamesPlayed
                setData(statPath.concat("/" + path).concat("/GamesPlayed"), numGames);

                 // update TotalScore
                 setData(statPath.concat("/" + path).concat("/TotalScore"), totalScore);

                 // update AverageScore
                 setData(statPath.concat("/" + path).concat("/AverageScore"), Math.round(totalScore/numGames * 100)/ 100);
            }

            // identify the winners
            const players = Object.entries(room.Players);
            const max_score = Math.max(...players.map(player =>
                player[1].score
            ));

            const winners = players.filter(player => 
                player[1].score === max_score)
                .map(player =>
                    player[1].name
            );

            // set the winners
            setData(`GameRooms/${id}/Winner`, winners);
                    

            // set player to not ready, not ready until play again is pressed
            setData(`GameRooms/${id}/Players/${user.uid}/ready`, false);

            const date = new Date();
            // game object data
            const gameObject = {
                "DateTime": `${date}`,
                "Difficulty": path,
                "GameMode": room.GameMode,
                "GameType": room.GameType,
                "PlayerMode": room.PlayerMode,
                "Score": room.GameMode === "Turbo"? player.score: "N/A",
                "Time" : room.GameMode === "Frenzy"? player.score: "N/A",
                "WrongQuestions": wrongQuestions
            }

            //upload gameData to Firebase
            const gameId = Object.entries(users[user.uid].Games).length;
            setData(`Users/${user.uid}/Games/${gameId}`, gameObject);

        }
    }, [stats])
        
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
    }

    const NewGame = (e) =>{
        e.preventDefault();

        // resets the scores for all players
        const tempPlayer = {}
        console.log(Object.keys(room.Players))

        Object.keys(room.Players).forEach(playerID =>
            tempPlayer[playerID] = {name: room.Players[playerID].name, score:0, ready: room.Players[playerID].ready}
        )
        
        //set yourself to true
        tempPlayer[user.uid].ready = true;
        
        
        //generate new numbers
        const nums = handleProblemGeneration(room.Difficulty1, room.Difficulty2);

        // create the exact same object
        const object = {
            "PlayerMode" : room.PlayerMode,
            "GameMode": room.GameMode,
            "Players": tempPlayer,
            "Difficulty1" : room.Difficulty1,
            "Difficulty2" : room.Difficulty2,
            "Problems" : {
                "number1": nums[0],
                "number2": nums[1]
            }, 
            "GameType": room.GameType,
            "Started": false,
            "TimeLeft": 60,
            "CountDownVis": false,
            "Delay": 4 ,
            "ProblemGate": true,
            "HostID": room.HostID, 
            "RoundWinner": "noOne",
            "Winner": "noOne"
        }
        
        //upload playerData to firebase
        setData(`GameRooms/${id}`,object);
        
        navigate(`../MathProblems/${id}`);
    }

    const handleProblemGeneration = (numDigits1, numDigits2) =>{
        let nums = []
        if (room){
          let num1;
          let num2;
          switch(room.GameType){  
            case "Addition":
              num1 = GenerateNumbers(numDigits1);
              num2 = GenerateNumbers(numDigits2);
  
              break;
            case "Subtraction":
              num1 = GenerateNumbers(numDigits1);
              num2 = GenerateNumbers(numDigits2);
  
              //swap to ensure the first number is bigger
              if(num1 < num2){
                let temp = num1;
                num1 = num2;
                num2 = temp;
              }
  
              break;
  
            case "Multiplication":
              num1 = GenerateNumbers(numDigits1);
              num2 = GenerateNumbers(numDigits2);
  
              break;
  
            case "Division":
              //convert from float to int
              numDigits1 = parseInt(numDigits1);
              numDigits2 = parseInt(numDigits2);
              let smallestDig = numDigits1 < numDigits2? numDigits1 : numDigits2;
              let biggestDig = numDigits1 > numDigits2? numDigits1 : numDigits2;
  
              let numSmall = GenerateNumbers(""+smallestDig);
  
              let randFactor;
              switch(biggestDig){
                case 1:
                  randFactor = Math.floor(Math.random() * 9/numSmall + 1);
                  break;
                case 2:
                  randFactor = Math.floor(Math.random() * 99/numSmall + 11/numSmall);
                  break;
                case 3:
                  randFactor = Math.floor(Math.random() * 999/numSmall + 101/numSmall);
                  break;
              }
              let numBig = randFactor * numSmall;
              num1 = numBig;
              num2 = numSmall;
              
          }
          nums.push(num1);
          nums.push(num2);
          return nums;
        }
    }


    const GenerateNumbers = (numDigits) =>{
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
        <div className = "gameOver" style = {{height: "100%"}}>
            <audio id = "gameOver" controls autoplay hidden>
                        <source src="../audio/gameover.wav" type="audio/wav"></source>
                    Your browser does not support the audio element.
                    </audio> 
            <div className='gameOver-block' style = {{marginTop: "10vh",opacity: gameOverTimer > 0? "1": "0", transition: "all 1s"}}>
                <h1>TIMES UP!</h1>
            </div>
            {room && player? 
            <div className='gameOver-content' style = {{opacity: gameOverTimer > 0? "0": "1", transition: "all 1s"}}>
                <Card className = "gameover-panel">
                    <Card.Body>
                        <Card.Title style={{fontSize: "2.5rem"}}>Game Results &nbsp; <FontAwesomeIcon icon={faSquarePollVertical} style={{color: "#ff7b00",}} /></Card.Title>
                        <Table striped bordered style={{ textAlign: 'center', color:"black", fontSize: "1.5rem" }}>
                            <tbody>
                                {room.PlayerMode === "Multiplayer" &&
                                    <tr>
                                        <td><FontAwesomeIcon icon={faTrophy} style={{color: "#fdec08",}} /> Winner{Object.entries(room.Winner).length > 1? "s": ""}: </td>
                                        {Object.entries(room.Winner).map(winner =>
                                            <td>
                                                <FontAwesomeIcon icon={faTrophy} style={{color: "#fdec08",}} />
                                                {winner[1]}
                                            </td>
                                        )}
    
                                    </tr>
                                }
                                <tr>
                                    <td>Player Mode &nbsp; <FontAwesomeIcon icon={faUser}/>: </td>
                                    <td colSpan={8}>{room.PlayerMode} 
                                    &nbsp;
                                    {room.PlayerMode === "Multiplayer"? 
                                    <FontAwesomeIcon icon={faUserGroup} style={{color: "#ff9500",}} /> :
                                    <FontAwesomeIcon icon={faUser} style={{color: "#ff9500",}} />}</td>
                                </tr>
                                <tr>
                                    <td>Difficulty &nbsp; <FontAwesomeIcon icon={faSignal} style={{color: "#ff0000",}} />:</td>
                                    <td colSpan={8}>{room.Difficulty1} digit by {room.Difficulty2} digit
                                    &nbsp;
                                    <FontAwesomeIcon icon={faDice} style={{color: "#5ebd1f",}} /></td>
                                </tr>
                                <tr>
                                    <td>Game Mode &nbsp; <FontAwesomeIcon icon={faGamepad} style={{color: "#ffae00",}} />:</td>
                                    <td colSpan={8}> {room.GameMode} &nbsp; <FontAwesomeIcon icon={faRocket} style={{color: "#ff3300",}} /></td>
                                </tr>
                                <tr>
                                    <td>Your Score &nbsp; <FontAwesomeIcon icon={faCheck} style={{color: "#44ff00",}} /> :</td>
                                    <td colSpan={8} style = {{color: "#04AF70", fontFamily: "'Roboto', sans-serif"}}> {player.score}</td>
                                </tr>
                                <tr>
                                    <td>Wrong Answers Feedback &nbsp; <FontAwesomeIcon icon={faXmark} style={{color: "#ff0000",}} />:</td>
                                    <td colSpan={8}> 
                                        <div style={{ maxHeight: "100px", overflowY: "scroll" }}>
                                            {Object.entries(wrongQuestions).length === 0? 
                                             <p style = {{color: "#04AF70"}}>None!</p>:
                                                <ol>
                                                    {Object.entries(wrongQuestions).map(q =>
                                                        <li style = {{fontFamily: "'Roboto', sans-serif"}}>
                                                            {q[1].number1}

                                                            &nbsp;
                                                            {room.GameType === "Addition"? "+"
                                                            :room.GameType === "Subtraction"? "-"
                                                            :room.GameType === "Multiplication"? "x"
                                                            :"÷"  
                                                            }

                                                            &nbsp;
                                                            {q[1].number2}

                                                            &nbsp;
                                                            =

                                                            &nbsp;
                                                            {room.GameType === "Addition"? q[1].number1 + q[1].number2
                                                            :room.GameType === "Subtraction"? q[1].number1 - q[1].number2
                                                            :room.GameType === "Multiplication"? q[1].number1 * q[1].number2
                                                            :q[1].number1 / q[1].number2  
                                                            }
                                                        </li>    
                                                    )}
                                                </ol>
                                            }   
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                    <div className = "btn-group">
                        <Button onClick = {()=> GoHome()} style = {{margin: "10px"}}  variant="primary">Return Home</Button>
                        <Button onClick = {(e)=> NewGame(e)}  style = {{margin: "10px"}} variant="primary">Play Again</Button>
                    </div>
                </Card>
            </div> : <></>}
           
    </div>)


};


export default GameOver;