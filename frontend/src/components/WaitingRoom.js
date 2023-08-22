import Button from 'react-bootstrap/Button';
import { useData, setData } from '../utilities/firebase';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const WaitingRoom = ({id}) =>{

    const [room, error] = useData(`GameRooms/${id}`);
    const [countDown, setCountDownVisibility] =  useState(false);

    const handleStart = () =>{
        setCountDownVisibility(!countDown);
        // start the game after waiting 4 seconds
        setTimeout(() =>{
            setData(`GameRooms/${id}/Started`, true);
        }, 3300)
    }

    return(
        room?
        countDown?
        <CountdownCircleTimer style = {{fontSize: "100px"}}
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
                </span>
            )}
            
        </CountdownCircleTimer>
        :

        <div className="d-flex justify-content-around align-content-center">
            <Card style={{ width: '35rem', fontSize: "25px", color: "black" }}>
                <Card.Body>
                <Card.Title style={{ fontSize: "40px" }}>Welcome to the {room.GameType} room !</Card.Title>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    Game Settings
                </div>
                <Table striped bordered hover style={{ textAlign: 'center' }}>
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
                    <Button variant="primary" onClick={handleStart}>Start</Button>
                </Card.Body>
            </Card>
      </div> : <></>
    )
};
export default WaitingRoom;