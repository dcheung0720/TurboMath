import Button from 'react-bootstrap/Button';
import { useData, setData } from '../utilities/firebase';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useEffect, useRef, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import "./WaitingRoom.css"


const WaitingRoom = ({id, delay, setDelay}) =>{

    const [room, error] = useData(`GameRooms/${id}`);
    const [countDown, setCountDownVisibility] =  useState(false);
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    const intervalId = useRef();

    // get screen size resize
    function getCurrentDimension(){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
        }
    
    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);
        
        return(() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])
    

    const handleStart = () =>{
        setCountDownVisibility(!countDown);
        setDelay(4);

        intervalId.current = setInterval(()=>{
            setDelay(delay => delay - 1);
        }, 1000);

        // start the game after waiting 4 seconds
        setTimeout(() =>{
            setData(`GameRooms/${id}/Started`, true);
            setCountDownVisibility(!countDown);
        }, 4000)      
    }

     // clear interval if delay is < 0
     useEffect(()=>{
        if(delay <= 0){
            clearInterval(intervalId.current);
        }

    }, [delay])

    //play the race audio once the countdown starts
    useEffect(()=>{
        if(countDown){
            playAudio("race");
        }
    },[countDown])

    //play audio
    const playAudio = (id) =>{
        //get correct audio element and play the sound
        document.getElementById(id).volume = .2;
        document.getElementById(id).play();
        console.log(document.getElementById(id))
    }

    return(
        room?
        countDown?
        <CountdownCircleTimer style = {{fontSize: "100px", marginTop: "100px"}}
            isPlaying
            duration={3}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            size = {500}
        >
            {({ remainingTime }) => 
            (
                <span >
                    {remainingTime > 0 ? remainingTime : "Go!" }
                    {/* racing sound */}
                    <audio id = "race" controls autoplay hidden>
                        <source src="../audio/race.wav" type="audio/wav"></source>
                    Your browser does not support the audio element.
                    </audio>  
                </span>
            )}     
        </CountdownCircleTimer>
        :

        <div className = "waiting-panel-container">
            <Card className = "waiting-panel">
                <Card.Body>
                <Card.Title style={{ fontSize: "35px" }}>Welcome to the {room.GameType} room !</Card.Title>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    Game Settings
                </div>
                <Table className = "primary" striped bordered hover style={{ textAlign: 'center' }}>
                    <tbody>
                        <tr>
                        <td>Player Mode</td>
                        <td>{room.PlayerMode}</td>

                        </tr>
                        <tr>
                        <td>Difficulty</td>
                        <td>{room.Difficulty1} digit by {room.Difficulty2} digit</td>

                        </tr>
                        <tr>
                        <td>Game Mode</td>
                        <td colSpan={2}> {room.GameMode}</td>

                        </tr>
                    </tbody>
                </Table>
                <Card.Text>
                    Start whenever you are ready to TURBO!        
                </Card.Text>
                    <Button variant="primary" onClick={()=> handleStart()}>Start</Button>
                </Card.Body>
            </Card>
      </div> : <></>
    )
};
export default WaitingRoom;