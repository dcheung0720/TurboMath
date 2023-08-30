import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import "./ProfileStatus.css";
import { useImages, useData, useUserState } from '../utilities/firebase';


const ProfileStatus = () =>{
    const [user] = useUserState();
    const images = useImages("Pfp");
    const [userData, error] = useData(`Users/${user.uid}`);
    return(
        userData?
        <Card className = "profileStatus" style={{ width: '18rem', height: "50vh" }}>
            <Card.Body>
                <Card.Title style = {{fontSize: "3rem"}}>Profile</Card.Title>
                    <Image src= {userData.Profile.Image} roundedCircle />
                <Card.Text>
                    {userData.Profile.Caption}
                </Card.Text>
                <Button variant="primary">Edit Profile</Button>
            </Card.Body>
        </Card>
        :
        <></>
    )
};



export default ProfileStatus;