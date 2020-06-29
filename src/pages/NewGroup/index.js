import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import NavBar from  '../../components/navbar';
import './styles.css';
import api from  '../../services/api';
import Spinner from '../../components/spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function NewGroup(){
    const [nome,setNome]=useState('');
    const [dataSorteio,setDataSorteio]=useState('');
    const [dataEvento,setDataEnvento]=useState('');
    const [valorMinimo ,setValorMinimo]=useState('');
    const [valorMaximo ,setValorMaximo]=useState('');
    const history=useHistory();
    const [spinner,setSpinner]= useState(false);
    const auth = { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}};

    async function handleNewGroup(e){
        e.preventDefault();
        const data={
            nome,
            dataSorteio,
            dataEvento,
            valorMinimo,
            valorMaximo
        }

        try {
            setSpinner(true);
            const response = await api.post('grupo',data,auth);
            if(response.data.status)
                toast.success(response.data.msg, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
            else
                toast.warning(response.data.msg, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
        } catch (error) {
            toast.error('Erro de conexão com o servidor', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
        }
        setSpinner(false);
        history.push('groups');
    }

    return(  
        <div >     
            <NavBar/> 
            <div className="container-new-group">
                <section className="form-new-group">
                    <form onSubmit={handleNewGroup}>
                        <strong>Nome do Sorteio:</strong>
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

};