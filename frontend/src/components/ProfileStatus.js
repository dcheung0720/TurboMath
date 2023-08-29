import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import "./ProfileStatus.css";
import { useImages } from '../utilities/firebase';

const ProfileStatus = () =>{
    const images = useImages("Pfp");
    return(
        <Card className = "ProfileStatus" style={{ width: '18rem', height: "50vh" }}>
            <Card.Body>
                <Card.Title>Profile</Card.Title>
                    <Image src= {images[0]} roundedCircle />
                <Card.Text>
                    I would Love to Learn about Math Today!
                </Card.Text>
                <Button variant="primary">Edit Profile</Button>
            </Card.Body>
        </Card>
    )
};



export default ProfileStatus;