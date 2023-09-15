import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';
import "./WorldHS.css";
import { useData } from '../utilities/firebase';
import { useEffect, useState } from 'react';

const WorldHS = ({AHS}) =>{

    const [gameType, setGameType] = useState("Multiplication");

    const [difficulty, setDifficulty] = useState("1x1");

    const [allUsers, error] = useData("/Users");

    const [highscores, setHighscores] = useState([]);

    useEffect(()=>{
        //if HS, find HS, else find average score
        if(allUsers && difficulty && gameType){
            if(!AHS){
                //[id, hs]
                const tempHighScores = Object.entries(allUsers).map(player => [player[0], player[1][gameType]["Turbo"][difficulty].HS])
                                   .filter(player => player[1] !== 0).sort((a,b) => b[1] - a[1]).slice(0, 3);
                setHighscores(tempHighScores);
            }
            else{
                //[id, ahs]
                const tempHighScores = Object.entries(allUsers).map(player =>  [player[0], player[1][gameType]["Turbo"][difficulty].AverageScore])
                                   .filter(player => player[1] !== 0).sort((a,b) => b[1] - a[1]).slice(0, 3);
                setHighscores(tempHighScores);
            }
        }
    }, [allUsers, difficulty, gameType])

    return(
        <Carousel fade style={{height: "100%"}}>
            <Carousel.Item >
                <Table className = "world-leaderboard" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th colSpan={3}>Multiplication 1x1</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>High Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highscores.map((playerScore,idx) => {
                            return(
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{playerScore[0]}</td>
                                    <td>{playerScore[1]}</td>
                                </tr>)
                            } )
                        }
                    </tbody>
                </Table>
        </Carousel.Item>
      </Carousel>
    )
}

export default WorldHS;