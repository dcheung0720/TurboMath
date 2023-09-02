import { useParams } from "react-router-dom";
import { useData } from "../utilities/firebase";
import "./Profile.css";
import ProfileStatus from "./ProfileStatus";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GameHistory from "./GameHistory";
import ProfileStats from "./ProfileStats";
import ProfileGraph from "./ProfileGraph";


const Profile = () =>{
    const {id} = useParams();

    // id must match param id name
    const [userData, error] = useData(`Users/${id}`);

    return(<div className="profilePage">
        <Container className = "container">
            <Row style={{width: "100%"}}>
                <Col xs={4}>
                    <ProfileStatus></ProfileStatus>
                </Col>
                <Col xs={8} style={{height: "50vh"}}>
                    <Row style = {{ marginBottom: '2vh', height: "20vh"}}>
                        <ProfileStats/>
                    </Row>
                    <Row style={{height: "28vh"}}> 
                        <ProfileGraph/>
                    </Row>
                </Col>
            </Row>
            <Row style={{backgroundColor: "white", borderRadius: "25px", width: "100%", border: "5px solid black" }} >
                <Col style = {{display: "flex", justifyContent: "center", marginTop: "1%"}}><GameHistory></GameHistory></Col>
            </Row>
        </Container>
    </div>)


};



export default Profile;