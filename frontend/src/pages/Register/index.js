import React, {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa'
import './styles.css';
import logoGrande from '../../assets/logo-grande.svg';
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/spinner';


export default function Register(){
    const [nome, setNome]= useState('');
    const [dataNascimento, setDataNascimento]= useState('');
    const [email, setEmail]= useState('');
    const [senha, setSenha]= useState('');

    const [spinner,setSpinner]= useState(false);
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data ={
            nome,
            dataNascimento,
            email,
            senha
        };
        try {
            setSpinner(true);
            const response = await api.post('usuario', data);
            
            if (response.data.register) {
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
        <div className="register-container">
           <section className ="form">
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Nome"
                        value={nome}
                        onChange={e=> setNome(e.target.value)}
                    />
                    <input 
                        type="date" 
                        placeholder="Data de Nascimento"
                        value={dataNascimento}
                        onChange={e=> setDataNascimento(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={senha}
                        onChange={e=> setSenha(e.target.value)}
                    />

                    <button 
                        className="button" 
                        type="submit">
                            {spinner? <Spinner/>:"Cadastrar"}
                    </button>

                    <Link className="link" to="/">
                    <FaArrowLeft size={16} color="#0076BF"/>
                     Tenho cadastro
                    </Link>

                </form>

            </section>
        
            <section className="logo-principal">
                <img src={logoGrande} alt="logo Amigo Chocolate"/>
            </section>
            <ToastContainer/>
        </div>
    );

}