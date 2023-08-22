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
        }, 100000)
    }

    return(
        room?
        countDown?
        <CountdownCircleTimer
            isPlaying
            duration={7}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
        >
            {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
        :

        <div className="d-flex justify-content-around align-content-center">
            <Card style={{ width: '35rem', fontSize: "25px" }}>
                <Card.Body>
                <Card.Title style={{ fontSize: "40px" }}>Welcome to the {room.GameType} room !</Card.Title>
                <Table striped bordered hover style={{ textAlign: 'center' }}>
                    <thead>
                            Game Settings
                    </thead>
                    <tbody>
                        <tr>
                        <td>PlayerMode</td>
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