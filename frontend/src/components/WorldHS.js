import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';
import "./WorldHS.css";
import { useData } from '../utilities/firebase';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const WorldHS = ({AHS}) =>{

    const [gameType, setGameType] = useState("Multiplication");

    const [allUsers, error] = useData("/Users");

    const [highscores, setHighscores] = useState([]);

    const difficulties = ["1x1", "2x1", "3x1", "2x2", "3x2", "3x3"];

    const gameTypes = ["Addition", "Subtraction", "Multiplication", "Division"];

    useEffect(()=>{
        //if HS, find HS, else find average score
        if(allUsers && gameType){
            if(!AHS){
                //[id, hs]
                let tempHighScores = difficulties.map(difficulty => Object.entries(allUsers).map(player => [player[0], player[1][gameType]["Turbo"][difficulty].HS])
                                   .filter(player => player[1] !== 0).sort((a,b) => b[1] - a[1]).slice(0, 3));
                
                for(let i = 0; i < tempHighScores.length; i ++){
                    while(tempHighScores[i].length < 3){
                        tempHighScores[i].push([null, null]);
                    }
                }

                setHighscores(tempHighScores);
            }
            else{
                //[id, ahs]
                let tempHighScores = difficulties.map(difficulty => Object.entries(allUsers).map(player =>  [player[0], player[1][gameType]["Turbo"][difficulty].AverageScore])
                .filter(player => player[1] !== 0).sort((a,b) => b[1] - a[1]).slice(0, 3)); 

                for(let i = 0; i < tempHighScores.length; i ++){
                    while(tempHighScores[i].length < 3){
                        tempHighScores[i].push([null, null]);
                    }
                }

                setHighscores(tempHighScores);
            }
        }
    }, [allUsers, gameType])

    const handleSelect = (ekey) =>{
        setGameType(ekey);
    }

    return(
        <Carousel fade style={{height: "100%"}}>
            {/* for every hs in every difficulty, find list the winners */}
            {highscores.map((highscore, index) => {
                return(
                <Carousel.Item  interval={4000}>
                    <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title style = {{fontSize: "17px"}}>Global {gameType} {difficulties[index]} {AHS? "Average High Score": "High Score"}</Card.Title>
                        <DropdownButton id="dropdown-basic-button" onSelect={(ekey)=> handleSelect(ekey)} title= {`${gameType}`} style = {{marginBottom: "10px"}}>
                            <Dropdown.Item eventKey={"Addition"}>Addition</Dropdown.Item>
                            <Dropdown.Item eventKey={"Subtraction"}>Subtraction</Dropdown.Item>
                            <Dropdown.Item eventKey={"Multiplication"}>Multiplication</Dropdown.Item>
                            <Dropdown.Item eventKey={"Division"}>Division</Dropdown.Item>
                        </DropdownButton>
                        <Table className = "world-leaderboard" striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>High Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    highscore.map((player, idx) => {
                                        return(
                                            <tr>
                                                <td>{idx + 1} {idx == 0 ?<FontAwesomeIcon icon={faTrophy} style={{color: "#fdec08",}} /> :
                                                    idx == 1? <FontAwesomeIcon icon={faTrophy} style={{color: "#C0C0C0",}} /> :
                                                    idx == 2? <FontAwesomeIcon icon={faTrophy} style={{color: "#CD7F32",}}/>: <></>}</td>
                                                {player[0] !== null?
                                                    <>
                                                        <td>{allUsers[player[0]].Profile.Name}</td>
                                                        <td>{player[1]}</td>
                                                    </>
                                                    :
                                                    <td colSpan={2}>No Data</td>
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                </Carousel.Item>)
            })}
            
      </Carousel>
    )
}

export default WorldHS;