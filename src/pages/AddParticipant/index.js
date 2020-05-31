import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FaAngleLeft,FaTimesCircle,FaCheckCircle} from 'react-icons/fa'
import NavBar from  '../../components/navbar';
import './styles.css';
import api from '../../services/api';
import Spinner from '../../components/spinner';
import { ToastContainer, toast } from 'react-toastify';
import participants from '../../assets/addParticipant.svg';

export default function AddParticipant(){
    const [_id,set_id]=useState(localStorage._id);
    const [nomeGrupo,setnomeGrupo]=useState(localStorage.nomeGrupo);
    
    const [email,setEmail]=useState('');
    const [spinner,setSpinner]= useState(false);
    const history = useHistory();
    const auth = { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}

    async function handleAddParticipant(e){
        e.preventDefault();
        const data ={
            _id,
            email
        };
        try {
            setSpinner(true);
            const response = await api.put('grupo/participante', data,auth);
            if (response.data.status) {
                toast.success(response.data.msg, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
            } else {
                toast.warning(response.data.msg, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
            }
        } catch (error) {
            toast.error('Falha de comunicação com o servidor', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
        }
        setEmail('');
        setSpinner(false);
    }
    return(
        <div>
            <NavBar/>
            
            <div className="participante-container">
                
                
                <img src={participants} alt="add Participantes"/>
                <FaAngleLeft size={50}color="#004F80" onClick={()=>history.goBack()}/>
                <div className="participante">
                    <h2>
                        Adicionando ao grupo: <br></br>
                        <strong>
                        {localStorage.nomeGrupo}
                        </strong>
                    </h2>
                    <section>
                        <form onSubmit={(e)=>handleAddParticipant(e)}>
                            
                            <input 
                                type="email" 
                                placeholder='Email do participante'
                                value={email}
                                onChange={e=> setEmail(e.target.value)}
                            /> 
                            <button 
                                className="button" 
                                type="submit">
                                    {spinner? <Spinner/>:"Adicionar"}
                            </button>
                        </form>
                    </section>
                    <ToastContainer/>
                </div>
            </div>
        </div>




    );
}