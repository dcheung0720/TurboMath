import { useUserState } from "../utilities/firebase";
import "./HomePage.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

const HomePage = () =>{
    const [user] = useUserState();

    return(
        <Container className = "home-page">
            <Row>
                <Col>
                    <h1>
                        {user? `Welcome to Turbo Math , ${user.displayName}!` :
                        "Please sign in with Google to use Turbo Math"}
                    </h1>
                 </Col>
            </Row>
            <Row>
                <Col xs={12} lg = {12}> 
                    <Card>
                        <Card.Body>
                            <Card.Title style = {{ fontSize: "30px"}}>The Goal of Turbo Math <FontAwesomeIcon icon={faBullseye} style={{color: "#fa0000",}} /></Card.Title>
                            <Card.Text style = {{ fontSize: "25px", textAlign: "left"}}>
                                <span style = {{ marginLeft: "50px"}}></span>Mental math skills play a pivotal role in the foundations of mathematics education,
                                both in primary and secondary levels. These skills empower students to swiftly
                                validate their solutions and detect glaringly erroneous answers. This, in turn, 
                                enables students to allocate more of their valuable learning time to comprehending
                                and applying mathematical concepts, rather than getting bogged down by arithmetic
                                inaccuracies. Beyond their utility in early education, adept mental math abilities yield a myriad of benefits.
                                They enhance memory, stimulate critical thinking, and contribute to the brain's plasticity, a crucial factor 
                                in cognitive development.
                            </Card.Text>

                            <Card.Text style = {{ fontSize: "25px", textAlign: "left"}}>
                                <span style = {{ marginLeft: "50px"}}></span>Turbo Math serves as a valuable tool for reinforcing students' mental math proficiency by creating an
                                engaging environment where they can aim for personal high scores and engage in friendly 
                                competition with their peers. Moreover, it incorporates a personal tracking system that
                                allows students to monitor their progress, showcasing not only whether but also how rapidly 
                                they are advancing in their mathematical abilities.
                            </Card.Text>
                        </Card.Body>
                    </Card> 
                </Col>
            </Row>
            <Row>
                <Col>1 of 3</Col>
                <Col xs={5}>2 of 3 (wider)</Col>
                <Col>3 of 3</Col>
            </Row>
        </Container>
    )
}



export default HomePage;