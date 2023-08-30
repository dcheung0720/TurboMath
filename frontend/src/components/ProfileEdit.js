import { useData, useImages } from "../utilities/firebase";
import "./ProfileEdit.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { setData } from "../utilities/firebase";
import Image from 'react-bootstrap/Image';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const ProfileEdit = ({handleModalVisibility}) =>{
    const {id} = useParams();
    const [userData, error] = useData(`Users/${id}`);

    const [pfpList] = useImages("Pfp");
    const [pfpSelected, setPfpSelected] = useState(null);
    const [caption, setCaption] = useState(null);
    
    //once userData is loaded
    useEffect(()=>{
        if(userData){
            setPfpSelected(userData.Profile.Image); 
            setCaption(userData.Profile.Caption);
        }
    }, [userData])

    const selectPfp = (e) =>{
        setPfpSelected(e.target.src);
    };

    const handleCaptionChange = (e)=>{   
        setCaption(e.target.value);
    };

    const handleSubmit = () =>{
        // set the new profile src
        setData(`Users/${id}/Profile/Image`, pfpSelected);

        // set the new profile caption
        setData(`Users/${id}/Profile/Caption`, caption);

        // close the modal
        handleModalVisibility();

    };
    
    return(<div className = "profileEditModal" onTouchStart={()=> handleModalVisibility()}>
        <Card className = "profileEdit" style = {{width: "50%"}} onClick={(e)=>{e.stopPropagation()}}>
            <Card.Body>
                <Card.Title>Profile Edit</Card.Title>
                <div className="imageSelections">
                    {console.log(pfpList)}
                    {pfpList.length >= 4? pfpList.sort((a,b) => a - b).map(pfpSrc => 
                        <Image className = "pfpSrc" src= {`${pfpSrc}`} 
                        style={{width: "10%", height:"30%", border: pfpSelected === pfpSrc? "2px solid blue": "None"}}
                        onClick={(e)=>selectPfp(e)}
                        roundedCircle />
                    ) : <></>}
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} value = {caption} onChange = {(e) => handleCaptionChange(e)}/>
                    </Form.Group>
                </Form>
                <Button variant="secondary" onClick={()=> handleModalVisibility()}> Cancel </Button>
                <Button variant="primary" onClick = {handleSubmit}> Submit</Button>
            </Card.Body>
        </Card>
    </div>)
};



export default ProfileEdit;