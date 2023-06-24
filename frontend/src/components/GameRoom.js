import { useData } from "../utilities/firebase";

const GameRoom = () =>{


    const [data, error] = useData('GameRooms');
    console.log(data);



};

export default GameRoom;