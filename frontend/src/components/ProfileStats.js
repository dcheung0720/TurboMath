import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useData } from '../utilities/firebase';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faFire } from '@fortawesome/free-solid-svg-icons';

const ProfileStats = () =>{

    const {id} = useParams();

    const [userData, error] = useData(`Users/${id}`);

    const gameMode = ["Addition", "Subtraction", "Multiplication", "Division"];

    const [selectedDifficulty, setSelectedDifficulty] = useState("1x1");


    const handleSelectDifficulty = (eKey) =>{
        setSelectedDifficulty(eKey);
    };

    return(
     <Card style={{ width: '47vw', height: "100%", marginBottom: '10px'}}>
        <Card.Body >
            <div className = "header" style = {{display: "flex", justifyContent:"space-between", alignItems: "center" }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                    <Card.Title style={{marginBottom: "5px"}}>Personal High Scores <FontAwesomeIcon icon={faFire} style={{color: "#ff0000"}} /></Card.Title>
                </div>
                <span className = "selection" style = {{display: "flex", alignItems: "center", position: "absolute", right: "3px", top: "3px", zIndex: "60" }}>
                    <div>Difficulty: </div>
                    <DropdownButton  key="secondary" 
                    id="dropdown-variants-Secondary" 
                    title= {`${selectedDifficulty}`}
                    style ={{margin:"5px"}}
                    onSelect = {(eKey) => handleSelectDifficulty(eKey)}
                    >
                        <Dropdown.Item href="#/action-1" eventKey="1x1">1x1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" eventKey="2x1">2x1</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" eventKey="3x1">3x1</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" eventKey="2x2">2x2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" eventKey="3x2">3x2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" eventKey="3x3">3x3</Dropdown.Item>
                    </DropdownButton>
                </span>
            </div>
            {userData?
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center",  height: '80%'}}>
                {gameMode.map((gm, idx) => {
                    return(
                        <Card className = {`${idx}`} style={{ width: '25%', height: "100%", marginRight: "20px"}}>
                            <Card.Body>
                            <Card.Title style = {{fontSize: "100%"}}>{gm}</Card.Title>
                            <p>{selectedDifficulty}</p>
                            <p>Best Score: {userData[gm]["Turbo"][selectedDifficulty].HS} <FontAwesomeIcon icon={faTrophy} style={{color: "#fdec08"}} /> </p>
                            </Card.Body>
                    </Card>)
                })}
            </div>:
            <></>
             }
        </Card.Body>
    </Card>)

};


export default ProfileStats;