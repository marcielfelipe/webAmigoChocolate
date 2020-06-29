import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import api from '../../services/api';
import {FaTimesCircle,FaCheckCircle,FaTrashAlt} from 'react-icons/fa'
import './styles.css';

export default function PopUpDesejo(){
    const [lista,setLista]=useState([]);
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
          borderColor :'#0076BF'
        },
    }
    async function getLista(){
        const response =await api.get('lista/'+localStorage._id,auth)
        setLista(response.data);
    }
    useEffect(()=>{
        getLista();
        // api.get('lista/'+localStorage._id,auth)
        // .then(response=>{
        //     setLista(response.data);
        // })
    },[localStorage._id,lista]);
    
    const [modalIsOpen,setIsOpen] = React.useState(true);
    const [desejo,setDesejo]=useState('');
    
    const dataDejeto={
        _id:localStorage._id,
        desejo
    }
    async function addListaDesejos(){
        if(dataDejeto.desejo){
        const res = await api.put('grupo/addlista/',dataDejeto,auth);
            setDesejo('');
        }
    }
    async function deleteItem(idDesejo){
        const dataDel={
            _id:localStorage._id,
            idDesejo
        }
        const res = await api.put('grupo/deletelista/',dataDel,auth);
    }
    function closeModal(){
        setIsOpen(false);
    }
    return(
        <div className="modal-container">
            <Modal style={customStyles} isOpen={modalIsOpen}>
                <h2>Lista de Desejos</h2>
                <ul style={{listStyle:'none',marginTop:5,marginBottom:10}}>

                    {lista.map(item=>(
                        <li key={item._id}
                            style={{marginTop:5}}
                        >
                            <strong>{item.desejo}</strong>
                            <FaTrashAlt 
                                style={{marginLeft:10}}
                                size={15} 
                                color={"#D62525"}
                                onClick={()=>deleteItem(item._id)}
                            />
                        </li>       
                    ))
                        
                    }
                </ul>
                <input 
                    type="text"
                    placeholder="Adicionar novo Desejo"
                    value={desejo}
                    onChange={e=>setDesejo(e.target.value)}
                />
                <section className="icons">
                    <FaTimesCircle size={30} color={"#D62525"}onClick={closeModal}/>
                    <FaCheckCircle size={30} color={"green"} onClick={addListaDesejos}/>
                </section>
            </Modal>
        </div>
    );

    
}
