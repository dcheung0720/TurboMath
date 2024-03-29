import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { setData, signInWithGoogle, signOut, useData, useUserState} from '../utilities/firebase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./Navigation.css"


const Navigation = () =>{

    // get user data when they log in
    const [user] = useUserState();

    // get users data
    const [data, error] = useData('Users/');

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    const [navToggled, setNavToggled] = useState(false);

    // when user logs in
    useEffect(() =>{
      // if user does not exist, add it to the database
      if(data !== undefined && user !== null && Object.keys(data).filter(x => x === user.uid).length === 0){
        const userData = {
          "Profile":{
             "Name": user.displayName,
             "Image": "https://firebasestorage.googleapis.com/v0/b/turbomath-a0c94.appspot.com/o/Pfp%2FCute%20Cat.png?alt=media&token=ef5d8f3a-268f-44df-a028-b402e352ca53",
             "Caption": "I would love to learn about math today!"
          },
          "Addition":{
              "Turbo": {
                  "1x1": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "2x1": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "3x1": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "2x2": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "3x2": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "3x3": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  }
              },
          },
          "Subtraction":{
            "Turbo": {
                "1x1": {
                  "HS": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageScore":0
                },
                "2x1": {
                  "HS": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageScore":0
                },
                "3x1": {
                  "HS": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageScore":0
                },
                "2x2": {
                  "HS": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageScore":0
                },
                "3x2": {
                  "HS": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageScore":0
                },
                "3x3": {
                  "HS": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageScore":0
                }
            }
          },
            "Multiplication":{
              "Turbo": {
                  "1x1": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "2x1": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "3x1": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "2x2": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "3x2": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "3x3": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  }
              }
          },
            "Division":{
              "Turbo": {
                  "1x1": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "2x1": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "3x1": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "2x2": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "3x2": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  },
                  "3x3": {
                    "HS": 0,
                    "GamesPlayed": 0,
                    "TotalScore": 0,
                    "AverageScore":0
                  }
              }
          },
          "AYFTAFG":{
              
          },
          "Friends":{
            "Following":{
               0: "noOne"
            },
            "Followed":{
              0: "noOne"
            }
          },

          "Games":{
              0: {
                 "Date" : "9-25-13",
                 "PlayerMode": "Solo",
                 "GameType": "Subtraction",
                 "GameMode": "Turbo",
                 "Score": 0,
                 "Time" : 10,
                 "Difficulty": "1x1",
              }
          }
        }

        setData(`/Users/${user.uid}`, userData )
      }
    }, [user, data])

    const SignInButton = () => (
      <button style={{ float: "right" }} className="btn btn-secondary btn-lg" onClick={signInWithGoogle}>
        Sign In
      </button>
    );

    // get screen size resize
    function getCurrentDimension(){
      return {
          width: window.innerWidth,
          height: window.innerHeight
      }
    }

    useEffect(() => {
      const updateDimension = () => {
        setScreenSize(getCurrentDimension())
      }
      window.addEventListener('resize', updateDimension);
      
      return(() => {
          window.removeEventListener('resize', updateDimension);
      })
    }, [screenSize])


  
  
    const SignOutButton = () => (
      <div style={{position: "fixed", right: "2vw", display: "flex", alignItems: "center", height: "100px"}}>
        {/* dropdown button */}
        {user !== null && data!== undefined && data[user.uid] !== undefined? 
        (!navToggled && screenSize.width > 680) || (navToggled && screenSize.width) > 1000?
          <Image src = {`${data[user.uid].Profile.Image}`} style = {{height: "70%"}}  roundedCircle /> 
          : <></>
        : <></>}
        <Navbar.Toggle onClick = {(e) => setNavToggled(!e.target.value)}aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              align="right"
              id="nav-dropdown-dark-example"
              title={"Welcome, " + user.displayName}
              menuVariant="dark"
              style={{
                fontSize: "1.5em",
                width: "100%", // Allow the width to adjust based on content
                display: "flex", // Change to flex to center the dropdown
                justifyContent: "center", // Center content horizontally
                alignItems: "center", // Center content vertically
                flexDirection: "column", // Arrange items in a column
                minHeight: "100%", // Fill the height of the dropdown
              }}
            >
                {/* Dropdown items */}
                <NavDropdown.Item href= {`/Profile/${user.uid}`} className="text-success">
                    <Nav.Link  href= {`/Profile/${user.uid}`} style = {{color: "#007bff"}}><FontAwesomeIcon icon={faUser} /> Your Profile</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">
                  <button style={{width: "100%", fontSize: "1em"}} className="btn btn-secondary btn-lg" onClick={() => signOut()}>
                    Sign Out
                  </button>
                </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    );
  
    return (
      <Navbar bg="dark" variant="dark" expand="lg" style = {{zIndex: 1000, padding: "0", height: "80px",position: "fixed", width: "100vw", top: "0"}}>
      <Container style={{ display: "flex", justifyContent: "center"}}>
        <Navbar.Brand href="/" style={{color: 'white', fontSize: "3em" }}>
            <img src = {"/images/Turbo.png" } 
            style = {{width: "50px", height: "50px", borderRadius: "50%" }}/>
            Turbo Math 
        </Navbar.Brand>
        {/* only show if the user is logged in */}
        {user && 
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" style = {{fontSize: "30px"}}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Games">Math Games</Nav.Link>
                <Nav.Link href={`/Profile/${user.uid}`}>Profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        }
      </Container>
      {user ? <SignOutButton /> : <SignInButton />}
    </Navbar>
    );

}



export default Navigation;