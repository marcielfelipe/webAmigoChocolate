import React from 'react';
import Modal from 'react-modal';
import api from '../../services/api';
import {FaTimesCircle,FaCheckCircle} from 'react-icons/fa'
import './styles.css';

export default function PopUp(){
    const auth = { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}};
    const customStyles = {
        content : {
          top                   : '40%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          color                 : '#0076BF',
          borderColor :'#0076BF',
          cursor:'pointer'
        }
    }
    const [modalIsOpen,setIsOpen] = React.useState(true);


    async function deleteGroup(){
        const responseDelete=await api.delete(`grupo/${localStorage._id}`,auth);
        setIsOpen(false);
    }
    function closeModal(){
        setIsOpen(false);
    }
    return(
        <div className="modal-container">
            <Modal style={customStyles} isOpen={modalIsOpen}>
                <h2>Deseja excluir esse grupo?</h2>
                <section className="icons">
                    <FaTimesCircle size={30} color={"#D62525"}onClick={closeModal}/>
                    <FaCheckCircle size={30} color={"green"} onClick={deleteGroup}/>
                </section>
            </Modal>
        </div>
    );

    
}
