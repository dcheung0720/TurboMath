import { useParams } from "react-router-dom";
import { useData } from "../utilities/firebase";


const Profile = () =>{
    const {id} = useParams();

    // id must match param id name
    const [userData, error] = useData(`Users/${id}`);

    console.log(userData);



};



export default Profile;