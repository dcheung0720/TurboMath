import Button from 'react-bootstrap/Button';
import { useData, setData } from '../utilities/firebase';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import "./WaitingRoom.scss"


const WaitingRoom = ({id}) =>{

    const [room, error] = useData(`GameRooms/${id}`);
    const [countDown, setCountDownVisibility] =  useState(false);

    const handleStart = () =>{
        setCountDownVisibility(!countDown);
        setTimeout(() =>{
            setData(`GameRooms/${id}/Started`, true);
        }, 4000)
    }

    return(
        room?
        countDown?
        <div class="demo">
            <div class="demo__colored-blocks">
                <div class="demo__colored-blocks-rotater">
                <div class="demo__colored-block"></div>
                <div class="demo__colored-block"></div>
                <div class="demo__colored-block"></div>
                </div>
                <div class="demo__colored-blocks-inner"></div>
                <div class="demo__text">Ready</div>
            </div>
            <div class="demo__inner">
                <svg class="demo__numbers" viewBox="0 0 100 100">
                <defs>
                    <path class="demo__num-path-1" d="M40,28 55,22 55,78"/>
                    <path class="demo__num-join-1-2" d="M55,78 55,83 a17,17 0 1,0 34,0 a20,10 0 0,0 -20,-10"/>
                    <path class="demo__num-path-2" d="M69,73 l-35,0 l30,-30 a16,16 0 0,0 -22.6,-22.6 l-7,7"/>
                    <path class="demo__num-join-2-3" d="M28,69 Q25,44 34.4,27.4"/>
                    <path class="demo__num-path-3" d="M30,20 60,20 40,50 a18,15 0 1,1 -12,19"/>
                </defs>
                <path class="demo__numbers-path" 
                        d="M-10,20 60,20 40,50 a18,15 0 1,1 -12,19 
                        Q25,44 34.4,27.4
                        l7,-7 a16,16 0 0,1 22.6,22.6 l-30,30 l35,0 L69,73 
                        a20,10 0 0,1 20,10 a17,17 0 0,1 -34,0 L55,83 
                        l0,-61 L40,28" />
                </svg>
            </div>
        </div> 
        :

        <div className="d-flex justify-content-around align-content-center">
            <Card style={{ width: '25rem', fontSize: "25px" }}>
                <Card.Body>
                <Card.Title style={{ fontSize: "40px" }}>Welcome to the {room.Type} room !</Card.Title>
                <Table striped bordered hover style={{ textAlign: 'center' }}>
                    <thead>
                            Game Settings
                    </thead>
                    <tbody>
                        <tr>
                        <td>Mode</td>
                        <td>{room.Mode}</td>

                        </tr>
                        <tr>
                        <td>Difficulty</td>
                        <td>{room.Difficulty1} digit by {room.Difficulty2} digit</td>

                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>

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