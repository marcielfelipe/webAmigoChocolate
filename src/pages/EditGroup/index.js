import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FaAngleLeft} from 'react-icons/fa';
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
    const history=useHistory();

    useEffect(()=>{
        api.get('grupo/'+localStorage._id,auth)
        .then(response=>{
            setNome(response.data.nome);
            setDataEnvento(response.data.dataEvento);
            setDataSorteio(response.data.dataSorteio);
            setValorMinimo(response.data.valorMinimo);
            setValorMaximo(response.data.valorMaximo);
        })
    },[localStorage._id]);
    const data={
        _id:localStorage._id,
        nome,
        dataSorteio,
        dataEvento,
        valorMinimo,
        valorMaximo
    }

    async function handleEditGroup(){
        const responseEdit=await api.put('grupo',data,auth);
        history.push('/groups');
    }


    return(
        <div >     
            <NavBar/> 
            <div className="container-edit-group">
                
                <FaAngleLeft size={50}color="#004F80" onClick={()=>history.goBack()}/>
                <section className="form-edit-group">
                    <form onSubmit={handleEditGroup}>
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
                            {spinner? <Spinner/>:'Salvar'}
                        </button>
                    </form>
                </section>
            </div>      
            <ToastContainer/>
        </div>




    );
}