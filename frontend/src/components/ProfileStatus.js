import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import "./ProfileStatus.css";
import {useData, useUserState } from '../utilities/firebase';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ProfileEdit from './ProfileEdit';
import { faUser, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ProfileStatus = () =>{
    const {id} = useParams();
    const [userData, error] = useData(`Users/${id}`);

    // toggle modal opening and closing
    const [editModalVis, setEditModalVis] = useState(false);

    const handleModalVisibility = () =>{
        setEditModalVis((prev) => !prev);
    };

    return(
        userData?
        <div>
            <Card className = "profileStatus" style={{ width: '100%', height: "50%", }}>
                <Card.Body>
                    <Card.Title style = {{fontSize: "3rem"}}>Profile <FontAwesomeIcon icon={faUser} /></Card.Title>
                        <Image src= {userData.Profile.Image} roundedCircle />
                    <Card.Text>
                        {userData.Profile.Caption}
                    </Card.Text>
                    <Button variant="primary" style = {{width: "120px"}}onClick={() => handleModalVisibility()}>Edit Profile &nbsp; <FontAwesomeIcon icon={faPenToSquare} /></Button>
                </Card.Body>
            </Card>
            {editModalVis? <ProfileEdit handleModalVisibility = {handleModalVisibility}></ProfileEdit> : <></>}
        </div>
        :
        <></>
    )
};



export default ProfileStatus;