import React from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FaPowerOff,FaUser} from 'react-icons/fa';
import logoBranca from '../../assets/logoBranca.svg';
import './styles.css';


export default function NavBar(){

    const history=useHistory();

    function LogOut(){
        localStorage.clear();
        history.push('/');
    }
    const nome=localStorage.getItem('nome');
    return(
        <header>
            <img src={logoBranca} alt="Amigo Chocolate" onClick={()=>history.push('/groups')}/>
            <span>Olá <strong className="name">{nome}!</strong></span>
            <section>
                <FaUser size={25} color="#fff" onClick={()=>history.push('/myprofile')}/>
                <FaPowerOff size={25} color="#D62525" onClick={LogOut}/>
            </section>

        </header>
    );
}