import React,{useState} from  'react';
import {Link,useHistory} from 'react-router-dom';
import {FaSignInAlt} from 'react-icons/fa'
import './styles.css';

import logoGrande from '../../assets/logo-grande.svg';
import api from '../../services/api';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Spinner from '../../components/spinner';


export default function Logon(){
    const[email,setEmail]= useState('');
    const[senha,setSenha]= useState('');
    const[spinner, setSpinner]=useState(false);

    const history = useHistory();

    async function handleLogon(e){
        e.preventDefault();

        const data={
            email,
            senha
        };

        try{
            setSpinner(true);
            const response = await api.post('login', data);
            if(response.data.auth){
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email',email);
                localStorage.setItem('nome',response.data.nome);
                history.push('/groups');
            }else{
                toast.error(response.data.msg, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
            }

        } catch (error) {
            toast.error("Falha de comunicação com o servidor", { position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
        }
        setSpinner(false);
    }
    return(
        <div className="logon-container">
            <section className ="form">
                <form onSubmit={handleLogon}>
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
                    <button className="button" type="submit">
                        {spinner? <Spinner/>: "Login"}
                    </button>

                    <Link className="link" to="/register">
                        <FaSignInAlt size={16} color="#0076BF"/>
                        Cadastrar-se
                    </Link>

                </form>
            </section>

            <section className="logo-principal">

                <img src={logoGrande} alt="Logo Amigo Chocolate"/>

            </section>
            <ToastContainer/>
        </div>
    );
}