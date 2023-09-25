import { useUserState } from "../utilities/firebase";
import "./HomePage.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faPlay } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import WorldHS from "./WorldHS";

const HomePage = () =>{
    const [user] = useUserState();

    return(
        <Container className = "home-page">
            <Row >
                <Col>
                    <h1 style = {{marginBottom: "10px"}}>
                        {user? <>Welcome to 
                        { <img src = {"/images/Turbo.png" } 
                            style = {{width: "50px", height: "50px", borderRadius: "50%" }}/>}
                            Turbo Math , {user.displayName}! </> :
                            "Please sign in with Google to use Turbo Math"}
                    </h1>
                 </Col>
            </Row>
            <Row>
                <Col xs = {12} lg = {4} style = {{marginBottom: "10px"}}>
                    <Card>
                        <Card.Body>
                            <h1> Welcome </h1>
                            <Card.Text>
                                Welcome to <img src = {"./images/Turbo.png" } style = {{width: "30px", height: "30px", borderRadius: "50%" }}/>
                                Turbo Math! Ready to enhance your mental math skills?
                            </Card.Text>
                            <Card.Link href="/Games"><Button variant="primary"> <FontAwesomeIcon icon={faPlay} /> &nbsp; Play! </Button></Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} lg = {4} style = {{marginBottom: "10px"}}><WorldHS AHS = {false} ></WorldHS></Col>
                <Col xs={12} lg = {4} style = {{marginBottom: "10px"}}><WorldHS AHS = {true} ></WorldHS></Col>
            </Row>
            <Row>
                <Col xs={12} lg = {12}> 
                    <Card>
                        <Card.Body>
                            <Card.Title style = {{ fontSize: "30px"}}>The Goal of <img src = {"./images/Turbo.png" } style = {{width: "30px", height: "30px", borderRadius: "50%" }}/> 
                            Turbo Math <FontAwesomeIcon icon={faBullseye} style={{color: "#fa0000",}} /></Card.Title>
                            <Card.Text style = {{ fontSize: "20px", textAlign: "left"}}>
                                <span style = {{ marginLeft: "50px"}}></span>Mental math skills play a pivotal role in the foundations of mathematics education,
                                both in primary and secondary levels. These skills empower students to swiftly
                                validate their solutions and detect glaringly erroneous answers. This, in turn, 
                                enables students to allocate more of their valuable learning time to comprehending
                                and applying mathematical concepts, rather than getting bogged down by arithmetic
                                inaccuracies. Beyond their utility in early education, adept mental math abilities yield a myriad of benefits.
                                They enhance memory, stimulate critical thinking, and contribute to the brain's plasticity, a crucial factor 
                                in cognitive development.
                            </Card.Text>

                            <Card.Text style = {{ fontSize: "20px", textAlign: "left"}}>
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
        </Container>
    )
}



export default HomePage;