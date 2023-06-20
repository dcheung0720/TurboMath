import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase';

const Navigation = () =>{
  const [user] = useUserState();
    const SignInButton = () => (
      <button className="btn btn-secondary btn-sm"
          onClick={() => signInWithGoogle()}>
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

    console.log(user);

    return ( <Navbar bg="dark" data-bs-theme="dark">
      <Container style = {{justifyContent: 'center'}}>
        <Navbar.Brand href="#home" style = {{color: 'white', fontSize: "30px"}}>Turbo Math</Navbar.Brand>
        { user ? <SignOutButton /> : <SignInButton /> }
      </Container>
    </Navbar>)

}







export default Navigation;