import { useParams } from "react-router-dom";
import { useData } from "../utilities/firebase";
import "./Profile.css";
import ProfileStatus from "./ProfileStatus";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GameHistory from "./GameHistory";


const Profile = () =>{
    const {id} = useParams();

    // id must match param id name
    const [userData, error] = useData(`Users/${id}`);

    return(<div className="profilePage">
        <Container className = "container" >
            <Row>
                <Col>
                    <ProfileStatus></ProfileStatus>
                </Col>
                <Col xs={6}>2 of 3 (wider)</Col>
            </Row>
            <Row>
                <Col><GameHistory></GameHistory></Col>
                <Col xs={5}>2 of 3 (wider)</Col>
                <Col>3 of 3</Col>
            </Row>
        </Container>
    </div>)


};



export default Profile;