import Form from 'react-bootstrap/Form';
import "./GameSettingsForm.css"
import { Button } from "react-bootstrap";
import { useState } from 'react';
import { setData, useData, useUserState } from '../utilities/firebase';
import { Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const GameSettingsForm = ({gameType}) =>{

    //navigator
    let navigate = useNavigate();

    //redirect id
    const [redirectId, setRedirectId] = useState(null);

    // set of states for forms
    const [playerMode, setPlayerMode] = useState("Solo");
    const [gameMode, setGameMode] = useState("Turbo");
    const [difficulty1, setDifficulty1] = useState("1");
    const [difficulty2, setDifficulty2] = useState("1");

    // gameroomData
    const [data, error] = useData('GameRooms');
    const [user] = useUserState();
    let roomIDs;
    
    if (data){
        roomIDs = Object.keys(data);
    }


    const CreateRoom = (e) =>{
        e.preventDefault();
        const id = FindId();

        const nums = handleProblemGeneration(difficulty1, difficulty2);

        const object = {
            "PlayerMode" : playerMode,
            "GameMode": gameMode,
            "Players": user.uid,
            "Difficulty1" : difficulty1,
            "Difficulty2" : difficulty2,
            "Problems" : {
                "number1": nums[0],
                "number2": nums[1]
            }, 
            "GameType": gameType,
            "Started": false,
            "TimeLeft": 60,
            "CountDownVis": false,
            "Delay": 4 ,
            "ProblemGate": true,
            "HostID": user.uid, 
            "RoundWinner": "noOne",
            "Winner": "noOne",
        }
        
        //upload to firebase
        setData(`GameRooms/${id}`,object);
        setRedirectId(id);
    }

    const handleProblemGeneration = (numDigits1, numDigits2) =>{
        let nums = []

        let num1;
        let num2;
        switch(gameType){  
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

    // redirect me once the user clicks create
    if(redirectId){
        navigate(`/MathProblems/${redirectId}`)
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

    const FindId = () =>{
        let id = Math.floor(Math.random() * 10000);
        // randomize until there isn't a match
        while(roomIDs.includes(id)){
            id = Math.floor(Math.random() * 10000);
        }

        return id;
    }

    const handleStateChange = (e, setState) =>{
        setState(e.target.value);
    };

    return (
        <Form>
          <fieldset>
            <Form.Group className="mb-3 d-flex align-items-center justify-content-center">
                <Form.Label htmlFor="disabledTextInput" className="mr-2 label-centered">GameType:</Form.Label>
                <Form.Control className="label" id="disabledTextInput" placeholder={gameType} disabled  />
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center justify-content-center" aria-label="Default select example">
                <Form.Label className="mr-2 label-centered"> #Players: </Form.Label>
                <Form.Control className="label" as="select" value = {playerMode} onChange = {(e) => handleStateChange(e, setPlayerMode)}>
                    <option> Solo </option>
                    <option> Multiplayer </option>
                </Form.Control>        
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center justify-content-center" aria-label="Default select example">
                <Form.Label className="mr-2 label-centered"> GameMode: </Form.Label>
                <Form.Control className="label" as="select" value = {gameMode} onChange = {(e) => handleStateChange(e, setGameMode)}>
                    <option> Turbo </option>
                    <option> Timer </option>
                </Form.Control>
                <div>
                        {gameMode === "Turbo"? "Turbo mode is when you try to answer as many questions as possible in one minute!":
                        "Timer mode is when you try to beat the best time for 10 questions!"}
                </div>          
            </Form.Group>
            
            <Form.Group className="mb-3 d-flex align-items-center justify-content-center">
                <Form.Label className="mr-2 label-centered">Difficulty: </Form.Label>
                <Form.Control className="label" as="select" value = {difficulty1} onChange = {(e) => handleStateChange(e, setDifficulty1)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Form.Control>

                <span style={{margin: "2%"}}> Digits By </span>

                <Form.Control className="label" as="select"  value = {difficulty2} onChange = {(e) => handleStateChange(e, setDifficulty2)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Form.Control>
                <span style={{margin: "2%"}}> Digits</span>          
            </Form.Group>

            <Button variant="btn btn-success" type = "submit" onClick = {(e)=>CreateRoom(e)} >Create</Button>
          </fieldset>
        </Form>
    )
}

export default GameSettingsForm;