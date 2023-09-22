import Button from 'react-bootstrap/Button';
import { useData, setData, useUserState } from '../utilities/firebase';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useEffect, useRef, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import "./WaitingRoom.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faTrophy, faUserGroup, faUser, faRocket, faGamepad,
    faSignal, faCheck, faXmark, faDice, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';


const WaitingRoom = ({id}) =>{

    const [room, error] = useData(`GameRooms/${id}`);
    const [delay, error3] = useData(`GameRooms/${id}/Delay`);
    const [countDownVis, error2] =  useData(`GameRooms/${id}/CountDownVis`);
    const [users, error4] = useData(`Users`);
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    //errors
    const [playerCountError, setPlayerCountError] = useState(false);
    const [playerReadyError, setPlayerReadyError] = useState(false);
    const [isShake, setIsShake] = useState(false);
    const errorSoundRef = useRef();
    let localDelay = 4;

    const intervalId = useRef();
    const [user] = useUserState();
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
        console.log(Object.values(room.Players).filter(player => player.ready === false));
        if(room.PlayerMode === "Multiplayer" 
        && (Object.keys(room.Players).length < 2 
        || Object.values(room.Players).filter(player => player.ready === false).length > 0)){
            if(Object.keys(room.Players).length < 2){
                // show count error/ not enough players
                setPlayerCountError(true);

                // play error <sound></sound>
                errorSoundRef.current.play();
                
                setIsShake(true);

                setTimeout(()=>{
                    setIsShake(false);
                }, 500);
            }
            else if(Object.values(room.Players).filter(player => player.ready === false).length > 0){
                // not everyone is ready!
                setPlayerReadyError(true);

                // play error sound
                errorSoundRef.current.play();

                setIsShake(true);

                setTimeout(()=>{
                    setIsShake(false);
                }, 500);
            }
        }
        else{
            // Make Countdown visible for everyone
            setData(`GameRooms/${id}/CountDownVis`, !countDownVis);
            setData(`GameRooms/${id}/Delay`, 4);

            intervalId.current = setInterval(()=>{
                setData(`GameRooms/${id}/Delay`, localDelay -1);;
                localDelay --;
            }, 1000);

            // start the game after waiting 4 seconds
            setTimeout(() =>{
                setData(`GameRooms/${id}/Started`, true);
                
                setData(`GameRooms/${id}/CountDownVis`, !countDownVis);
            }, 4000)      
        }
    }

     // clear interval if delay is < 0
     useEffect(()=>{
        if(delay <= 0){
            clearInterval(intervalId.current);
        }

    }, [delay])

    //play the race audio once the countdown starts
    useEffect(()=>{
        if(countDownVis){
            playAudio("race");
        }
    },[countDownVis])

    //play audio
    const playAudio = (id) =>{
        //get correct audio element and play the sound
        document.getElementById(id).volume = .2;
        document.getElementById(id).play();
    }

    return(
        room && user?
        countDownVis?
        <CountdownCircleTimer class = "time" style = {{fontSize: "100px"}}
            isPlaying
            duration={3}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            size = {350}
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
            <audio ref = {errorSoundRef}  id = "id" controls hidden autoPlay>
                <source src = "../audio/error.mp3" type = "audio/mp3"></source>
                Your browser does not support the audio element.
            </audio>
            <Card id = {isShake? "shake": "null"} className = "waiting-panel">
                <Card.Body>
                    <Card.Title style={{ fontSize: "35px" }}>Welcome to the {room.GameType} room !</Card.Title>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        Game Settings
                    </div>
                    <Table className = "primary" striped bordered hover style={{ textAlign: 'center' }}>
                        <tbody>
                        <tr>
                            <td>Room ID:</td>
                                <td>{id}</td>
                            </tr>

                            <tr>
                            <td>Player Mode &nbsp; <FontAwesomeIcon icon={faUser}/>:</td>
                            <td>{room.PlayerMode} 
                                &nbsp;
                                {room.PlayerMode === "Multiplayer"? 
                                <FontAwesomeIcon icon={faUserGroup} style={{color: "#ff9500",}} /> :
                                <FontAwesomeIcon icon={faUser} style={{color: "#ff9500",}} />}</td>
                            </tr>

                            <tr>
                            <td>Difficulty  &nbsp; <FontAwesomeIcon icon={faSignal} style={{color: "#ff0000",}} />:</td>
                            <td>
                                {room.Difficulty1} digit by {room.Difficulty2} digit 
                                &nbsp;
                                <FontAwesomeIcon icon={faDice} style={{color: "#5ebd1f",}} />
                            </td>

                            </tr>
                            <tr>
                            <td>Game Mode &nbsp;  <FontAwesomeIcon icon={faGamepad} style={{color: "#ffae00",}} />: </td>
                            <td colSpan={2}> {room.GameMode} &nbsp; <FontAwesomeIcon icon={faRocket} style={{color: "#ff3300",}} /></td>

                            </tr>
                        </tbody>
                    </Table>
                    {room.PlayerMode === "Multiplayer" &&
                    <>
                        <p>Player List: {Object.entries(room.Players).length}/8 </p>
                        <div className = "player-list">
                            <Table striped bordered hover>
                                <tbody>
                                {Object.entries(room.Players).map((player, idx) =>
                                    <tr>
                                        <td>Player {idx+ 1}:</td>
                                        <td>
                                            <img style = {{width: "50px", height: "50px", borderRadius: "50%"}} src = {users[player[0]].Profile.Image}></img> 
                                            &nbsp;
                                            {player[1].name} 
                                            &nbsp;
                                            {
                                                player[1].ready?
                                                <FontAwesomeIcon icon={faCircleCheck} style={{color: "#16df37"}} />
                                                :<FontAwesomeIcon icon={faCircleXmark} style={{color: "#df1616"}} />
                                            }
                                        </td>
                                    </tr>
                                )}                  
                                </tbody>
                            </Table>
                        </div>
                    </>}
                    {/* show waiting on host to start if not host */}
                    {room.HostID === user.uid?
                        <Card.Text>
                            Start whenever you are ready to TURBO!        
                        </Card.Text>
                        :
                        <Card.Text>
                            Waiting for the host to start...       
                        </Card.Text>
                    }   
                    {room.HostID === user.uid &&
                        <>
                            {playerCountError && <Card.Text className='warning'>You need at least 2 players to start</Card.Text>}
                            {playerReadyError && <Card.Text className='warning'>Not everyone is back in the room!</Card.Text>}
                            <Button variant="primary" onClick={()=> handleStart()}>Start</Button>
                        </>
                    }
                </Card.Body>
            </Card>
      </div> : <></>
    )
};
export default WaitingRoom;