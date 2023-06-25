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
          SpeedMathHS: 10
        }

        setData(`/Users/${user.uid}`, userData )
      }
    }, [user])

    const SignInButton = () => (
      <button className="btn btn-secondary btn-sm"
          onClick={() => 
            signInWithGoogle()
          }>
        Sign In
      </button>
    );

    const SignOutButton = () => (
      <>
        <button className="btn btn-secondary btn-sm"
          onClick={() => signOut()}>
          Sign Out
        </button>
      </>

    );

    return ( <Navbar bg="dark" data-bs-theme="dark">
      <Container style = {{justifyContent: 'center'}}>
        <Navbar.Brand href="/" style = {{color: 'white', fontSize: "30px"}}>Turbo Math</Navbar.Brand>
        { user ? <SignOutButton /> : <SignInButton /> }
      </Container>
    </Navbar>)

}



export default Navigation;