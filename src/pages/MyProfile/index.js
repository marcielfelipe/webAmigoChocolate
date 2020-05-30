import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {FaUserEdit} from 'react-icons/fa';
import NavBar from  '../../components/navbar';
import './styles.css';
import Spinner from '../../components/spinner';
import api from '../../services/api';

export default function MyProfile(){
    const [nome, setNome]= useState(localStorage.getItem('nome'));
    const [dataNascimento, setDataNascimento]= useState('');
    const [email, setEmail]= useState('');
    const [senhaAntiga, setSenhaAntiga]= useState('');
    const [novaSenha,setNovaSenha]=useState('');
    const [spinner,setSpinner]= useState(false);
    const history = useHistory();

    const auth = { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}

    getData();
    async function getData(){

        try {
            const response = await api.get('meuperfil',auth);
            
            setEmail(response.data.email);
        } catch (error) {
            toast.error('Faça login novamente!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
        }
        setSpinner(false);
    }

    async function handleAlter(e){
        e.preventDefault();
        const data ={
            nome,
            dataNascimento,
            email
        };
        const alterPass={
            senhaAntiga,
            novaSenha
        }
        try {
            setSpinner(true);
            const response = await api.put('usuario', data,auth);
            const pass = await api.put('editsenha',alterPass,auth);
            if (response.data.status&&pass.data.status) {
                toast.success(pass.data.msg, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000, onClose: history.push('/')});
                toast.success(response.data.msg, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000, onClose: history.push('/')});
            } else {
                toast.warning(response.data.msg, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000, onClose: history.push('/')});
            }
        } catch (error) {
            toast.error('Falha de comunicação com o servidor', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
        }
        setSpinner(false);
    }
    

    return(
        <div className="container-myprofile">
            <NavBar/>
            <div className="myprofile">
                <FaUserEdit size={250} color={'#002740'}/>
                <section>
                    <form onSubmit={handleAlter}>
                        <input 
                            type="text" 
                            placeholder=''
                            value={nome}
                            onChange={e=> setNome(e.target.value)}
                        />
                        <input 
                            type="date" 
                            value={dataNascimento}
                            onChange={e=> setDataNascimento(e.target.value)}
                        />
                        <input 
                            disabled
                            type="email" 
                            placeholder=''
                            value={email}
                            onChange={e=> setEmail(email)}
                            onClick={()=>(toast.warning('Email não pode ser alterado', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000}))}
                        />
                    
                        

                        
                        <input 
                            type="password" 
                            placeholder="Senha atual"
                            value={senhaAntiga}
                            onChange={e=> setSenhaAntiga(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Nova Senha"
                            value={novaSenha}
                            onChange={e=> setNovaSenha(e.target.value)}
                        />

                        <button 
                            className="button" 
                            type="submit">
                                {spinner? <Spinner/>:"Salvar"}
                        </button>


                    </form>

                </section>
            

                <ToastContainer/>
            </div>
        </div>


    );
}