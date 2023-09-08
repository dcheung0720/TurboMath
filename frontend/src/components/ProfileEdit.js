import { useData, useImages } from "../utilities/firebase";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { setData } from "../utilities/firebase";
import Image from 'react-bootstrap/Image';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { text } from "@fortawesome/fontawesome-svg-core";
import "./ProfileEdit.css"


const ProfileEdit = ({handleModalVisibility}) =>{
    const {id} = useParams();
    const [userData, error] = useData(`Users/${id}`);

    const textAreaRef = useRef(null);

    const [pfpList] = useImages("Pfp");
    const [pfpSelected, setPfpSelected] = useState(null);
    const [caption, setCaption] = useState(null);
    const [origCaption, setOrigCaption] = useState(null);
    const [textAreaDisabled, setTextAreaDisabled] = useState(true);

    const [numChars, setNumChars] = useState(0);
    const charLimit = 150;
    const [charOverFlow, setCharOverFlow] = useState(false);
    const [shake, setShake] = useState(false);
    
    //once userData is loaded
    useEffect(()=>{
        if(userData){
            setPfpSelected(userData.Profile.Image); 
            setCaption(userData.Profile.Caption);
            setOrigCaption(userData.Profile.Caption);
            setNumChars(userData.Profile.Caption.length);
        }
    }, [userData])

    // focus on the textarea everything the textAreaDisabled is changed
    useEffect(()=>{
        textAreaRef.current.focus();
    }, [textAreaDisabled])

    const selectPfp = (e) =>{
        setPfpSelected(e.target.src);
    };

    const handleCancelCaptionEdit = ()=>{
        setCaption(origCaption);
        handleCaptionEdit();
    }

    const handleCaptionChange = (e)=>{   
        setCaption(e.target.value);
        setNumChars(e.target.value.length);
        console.log(numChars)
    };

    const handleCaptionEdit = ()=>{
        setTextAreaDisabled((prev) => !prev);
    };

    const handleSubmit = () =>{
        console.log(numChars)
        // only permit user to have 
        if(numChars < charLimit){
            // set the new profile src
            setData(`Users/${id}/Profile/Image`, pfpSelected);

            // set the new profile caption
            setData(`Users/${id}/Profile/Caption`, caption);

            // close the modal
            handleModalVisibility();

            //remove char overflow overflow
            setCharOverFlow(false);
        }
        else{
            // char overflow
            setCharOverFlow(true);

            // shake the form (animate)
            setShake(true);

            // stop shake after 1 second
            setTimeout(()=>{
                setShake(false);
            }, 500);
        }
    };

    
    return(<div className = "profileEditModal" onClick={()=> handleModalVisibility()}>
        <Card id = {shake ? "shake" : null} className = "profileEdit" onClick={(e)=>{e.stopPropagation()}}>
            <Card.Body>
                <Card.Title style = {{fontSize: "40px"}}>Profile Edit</Card.Title>
                <div className = "Pfp" style={{display: "flex", justifyContent: "space-evenly", width: "100%"}}>
                    <div className = "currentSelection" style={{height: "100%"}}>
                        <Card.Title>Profile Picture</Card.Title>
                        <Card style={{ width: '18rem', height: "50%", borderRadius: "50%", overflow: "hidden"}} >
                                <Image className = "pfpSrc" src= {`${pfpSelected}`} 
                                    style={{width: "100%", height:"100%"}}
                                    roundedCircle />
                            </Card>
                    </div>
                    <div className="imageSelections" style={{height: "100%"}}>
                        <Card.Title>Image Selection</Card.Title>
                        <Card style={{ width: '100%', height: "100%"}}>
                            <div style = {{display: "flex", flexWrap: "wrap", overflow: "scroll", width: "100%", height: "100%"}}>
                                {pfpList.length >= 4? pfpList.sort((a,b) => a - b).map(pfpSrc => 
                                    <Image className = "pfpSrc" src= {`${pfpSrc}`} 
                                    style={{width: "70px", height:"70px", border: pfpSelected === pfpSrc? "2px solid blue": "None"}}
                                    onClick={(e)=>selectPfp(e)}
                                    roundedCircle />
                                    ) : <></>}
                            </div>
                        </Card>  
                    </div>
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{width: "100%", textAlign: "left"}}>Your Caption:</Form.Label>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div className = "text-area-controls"style = {{width: "100%"}}>
                                <Form.Control ref = {textAreaRef} disabled = {textAreaDisabled} as="textarea" rows={3} 
                                    value = {caption} onChange = {(e) => handleCaptionChange(e)}
                                    style={{resize: "none"}}/>
                                {charOverFlow? <p style={{color: "red"}}> Your caption exceeded the character max count!</p> : <></>}
                            </div>
                            {textAreaDisabled?
                            <Button variant="primary"  onClick = {handleCaptionEdit} 
                                style={{width: "15%", height: "50%", marginLeft: "1vw"}}
                            > Edit</Button>
                            : <Button  variant="secondary" onClick = {handleCancelCaptionEdit}
                            style={{width: "15%", height: "50%", marginLeft: "1vw"}}
                            > Cancel</Button>
                            }
                        </div>
                    </Form.Group>
                </Form>
                <div className= "buttonControlGroup" style = {{display: "flex", justifyContent: "space-evenly"}}>
                    <Button variant="secondary" style = {{padding: 0, margin: "10px"}} onClick={handleModalVisibility}> Cancel </Button>
                    <Button variant="primary" style = {{whiteSpace: "nowrap", textAlign: "center", paddingLeft: 0, paddingRight: 0 }} onClick = {handleSubmit}> Save Changes</Button>
                </div>
            </Card.Body>
        </Card>
    </div>)
};



export default ProfileEdit;