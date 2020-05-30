import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FaRandom,FaPlus,FaTrash,FaUserCog,FaCalendarAlt,FaCalendarCheck,FaChartLine,FaUnlock,FaUsers,FaUserCircle,FaUserPlus,FaEdit} from 'react-icons/fa';
import NavBar from  '../../components/navbar';
import './styles.css';
import api from '../../services/api';
import Spinner from '../../components/spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditGroup(){
    const [nome,setNome]=useState('');
    const [dataSorteio,setDataSorteio]=useState('');
    const [dataEvento,setDataEnvento]=useState('');
    const [valorMinimo ,setValorMinimo]=useState('');
    const [valorMaximo ,setValorMaximo]=useState('');
    


    const [spinner,setSpinner]= useState(false);
    const auth = { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}};

    useEffect(()=>{
        api.get('grupo/'+localStorage._id,auth)
        .then(response=>{
        })
    },[localStorage._id]);


    return(
        <div >     
            <NavBar/> 
            <div className="container-edit-group">
                <section className="form-edit-group">
                    <form>
                        <strong>Nome do Grupo:</strong>
                        <input 
                            type="text" 
                            value={nome}
                            onChange={e=> setNome(e.target.value)}
                        />
                        <strong>Data do Sorteio:</strong>
                        <input 
                            type="date" 
                            value={dataSorteio}
                            onChange={e=> setDataSorteio(e.target.value)}
                        />
                        <strong>Data do Evento:</strong>
                        <input 
                            type="date" 
                            value={dataEvento}
                            onChange={e=> setDataEnvento(e.target.value)}
                        />
                        <div>
                            <section>
                                <strong>Valor Mínimo:</strong>
                                <input 
                                    type="text" 
                                    value={valorMinimo}
                                    onChange={e=> setValorMinimo(e.target.value)}
                                />
                            </section>
                            <section>
                                <strong>Valor Máximo:</strong>
                                <input 
                                    type="text" 
                                    value={valorMaximo}
                                    onChange={e=> setValorMaximo(e.target.value)}
                                />
                            </section>

                        </div>
                        <button type="submit">
                            {spinner? <Spinner/>:'Cadastrar'}
                        </button>
                    </form>
                </section>
            </div>      
            <ToastContainer/>
        </div>




    );
}