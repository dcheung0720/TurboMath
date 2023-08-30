import { useImages } from "../utilities/firebase";
import "./ProfileEdit.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProfileEdit = ({handleModalVisibility}) =>{

    const pfpList = useImages("Pfp");
    
    return(<div className = "profileEditModal" onClick={()=> handleModalVisibility()}>
        <Card className = "profileEdit" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    </div>)
};



export default ProfileEdit;