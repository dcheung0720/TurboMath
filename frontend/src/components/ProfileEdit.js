import { useImages } from "../utilities/firebase";
import "./ProfileEdit.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { setData } from "../utilities/firebase";
import Image from 'react-bootstrap/Image';

const ProfileEdit = ({handleModalVisibility}) =>{

    
    const [pfpList] = useImages("Pfp");
    
    return(<div className = "profileEditModal" onClick={()=> handleModalVisibility()}>
        <Card className = "profileEdit" onClick={(e)=>{e.stopPropagation()}}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Profile Edit</Card.Title>
                <div className="imageSelections">
                    {console.log(pfpList)}
                    {pfpList? pfpList.map(pfpSrc => 
                        <Image className = "pfpSrc" src= {`${pfpSrc}`} style={{width: "10%"}} roundedCircle />
                    ) : <></>}
                </div>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Button variant="secondary" onClick={()=> handleModalVisibility()}>Cancel </Button>
                <Button variant="primary"> Submit</Button>
            </Card.Body>
        </Card>
    </div>)
};



export default ProfileEdit;