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
    const [origCaption, setOrigCaption] = useState(null);
    const [textAreaDisabled, setTextAreaDisabled] = useState(true);
    
    //once userData is loaded
    useEffect(()=>{
        if(userData){
            setPfpSelected(userData.Profile.Image); 
            setCaption(userData.Profile.Caption);
            setOrigCaption(userData.Profile.Caption);
        }
    }, [userData])

    const selectPfp = (e) =>{
        setPfpSelected(e.target.src);
    };

    const handleCancelCaptionEdit = ()=>{
        setCaption(origCaption);
        handleCaptionEdit();
    }

    const handleCaptionChange = (e)=>{   
        setCaption(e.target.value);

    };

    const handleCaptionEdit = (e)=>{
        setTextAreaDisabled((prev) => !prev);
    };

    const handleSubmit = () =>{
        // set the new profile src
        setData(`Users/${id}/Profile/Image`, pfpSelected);

        // set the new profile caption
        setData(`Users/${id}/Profile/Caption`, caption);

        // close the modal
        handleModalVisibility();

    };
    
    return(<div className = "profileEditModal" onClick={()=> handleModalVisibility()}>
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
                        <Form.Label style={{float: "left"}}>Your Caption:</Form.Label>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Form.Control disabled = {textAreaDisabled} as="textarea" rows={3} 
                                value = {caption} onChange = {(e) => handleCaptionChange(e)}
                                style={{resize: "none"}}/>
                            {textAreaDisabled?
                            <Button variant="primary" onClick = {handleCaptionEdit} 
                                style={{width: "10%", height: "50%"}}
                            > Edit</Button>
                            : <Button variant="secondary" onClick = {handleCancelCaptionEdit}> Cancel</Button>
                            }
                        </div>
                    </Form.Group>
                </Form>
                <Button variant="secondary" onClick={()=> handleModalVisibility()}> Cancel </Button>
                <Button variant="primary" onClick = {handleSubmit}> Save Changes</Button>
            </Card.Body>
        </Card>
    </div>)
};



export default ProfileEdit;