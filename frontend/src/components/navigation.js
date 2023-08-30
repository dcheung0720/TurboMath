import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { setData, signInWithGoogle, signOut, useData, useUserState} from '../utilities/firebase';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () =>{

    // get user data when they log in
    const [user] = useUserState();

    // get users data
    const [data, error] = useData('/Users');

    // when user logs in
    useEffect(() =>{
      // if user does not exist, add it to the database
      if(data != null && user!= null && Object.keys(data).filter(x => x == user.uid).length == 0){
        const userData = {
          "Profile":{
             "Name": user.displayName,
             "Image": "https://firebasestorage.googleapis.com/v0/b/turbomath-a0c94.appspot.com/o/Pfp%2Felephant.jpg?alt=media&token=1d0d7124-657b-44cf-bf02-be4ff72a6b22",
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
              "Frenzy":{
                "1x1": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "2x1": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "3x1": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "2x2": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "3x2": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "3x3": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                }
              }
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
            },
            "Frenzy":{
              "1x1": {
                "BT": 0,
                "GamesPlayed": 0,
                "TotalScore": 0,
                "AverageTime":0
              },
              "2x1": {
                "BT": 0,
                "GamesPlayed": 0,
                "TotalScore": 0,
                "AverageTime":0
              },
              "3x1": {
                "BT": 0,
                "GamesPlayed": 0,
                "TotalScore": 0,
                "AverageTime":0
              },
              "2x2": {
                "BT": 0,
                "GamesPlayed": 0,
                "TotalScore": 0,
                "AverageTime":0
              },
              "3x2": {
                "BT": 0,
                "GamesPlayed": 0,
                "TotalScore": 0,
                "AverageTime":0
              },
              "3x3": {
                "BT": 0,
                "GamesPlayed": 0,
                "TotalScore": 0,
                "AverageTime":0
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
              },
              "Frenzy":{
                "1x1": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "2x1": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "3x1": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "2x2": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "3x2": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "3x3": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
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
              },
              "Frenzy":{
                "1x1": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "2x1": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "3x1": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "2x2": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "3x2": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
                },
                "3x3": {
                  "BT": 0,
                  "GamesPlayed": 0,
                  "TotalScore": 0,
                  "AverageTime":0
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
    }, [user])

    const SignInButton = () => (
      <button style={{ float: "right" }} className="btn btn-secondary btn-lg" onClick={signInWithGoogle}>
        Sign In
      </button>
    );
  
    const SignOutButton = () => (
      <div style={{position: "fixed", right: "2vw"}}>
        {/* dropdown button */}
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              align="right"
              id="nav-dropdown-dark-example"
              title={"Welcome, " + user.displayName}
              menuVariant="dark"
              style={{
                color: "white",
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
                <NavDropdown.Item style={{width: "13vw", fontSize: "1.5em", textAlign: "left"}} href={`/Profile/${user.uid}`} className="text-success">
                    <Link to = {`/Profile/${user.uid}`}> Your Profile</Link>
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
      <Navbar bg="dark" variant="dark" expand="lg" style = {{zIndex: 1000, padding: "0", height: "12vh", display: "flex", justifyContent: "center", position: "fixed", width: "100vw", top: "0"}}>
        <Container style = {{ justifyContent: "center"}}>
            <Navbar.Brand href="/" style={{color: 'white', fontSize: "4em" }}>
              Turbo Math
            </Navbar.Brand>
        </Container>
        {user ? <SignOutButton /> : <SignInButton />}
      </Navbar>
    );

}



export default Navigation;