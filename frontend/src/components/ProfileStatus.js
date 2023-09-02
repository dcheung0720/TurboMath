import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import "./ProfileStatus.css";
import {useData, useUserState } from '../utilities/firebase';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ProfileEdit from './ProfileEdit';



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
            <Card className = "profileStatus" style={{ width: '100%', height: "50vh" }}>
                <Card.Body>
                    <Card.Title style = {{fontSize: "3rem"}}>Profile</Card.Title>
                        <Image src= {userData.Profile.Image} roundedCircle />
                    <Card.Text>
                        {userData.Profile.Caption}
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleModalVisibility()}>Edit Profile</Button>
                </Card.Body>
            </Card>
            {editModalVis? <ProfileEdit handleModalVisibility = {handleModalVisibility}></ProfileEdit> : <></>}
        </div>
        :
        <></>
    )
};



export default ProfileStatus;