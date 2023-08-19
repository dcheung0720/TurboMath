import "./CreateModal.css"

const CreateModal = ({ChangeModal}) =>{
    return(
        <div className = "modalBackground" onClick={() => ChangeModal()}>
            <div className = "modalContainer">
                This is the modal!
            </div>
        </div>
    )    

}

export default CreateModal;