import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FaRandom,FaPlus,FaTrash,FaUserCog,FaCalendarAlt,FaCalendarCheck,FaCheck,FaChartLine,FaUnlock,FaUsers,FaUserCircle, FaCheckDouble,FaUserPlus,FaEdit} from 'react-icons/fa';
import grupoAmigos from '../../assets/grupoAmigos.svg';
import NavBar from  '../../components/navbar';
import './styles.css';





export default function NewGroup(){
    return(
        
        <div >     
            <NavBar/> 
            <div className="container">
                <section className="form">
                    <form action="">
                        <strong>Nome do Grupo</strong>
                        <input type="text"/>
                        <strong>Data do Sorteio</strong>
                        <input type="date"/>
                        <strong>Data do Evento</strong>
                        <input type="date"/>
                        <strong>Valor Mínimo</strong>
                        <input type="text"/>
                        <strong>Valor Máximo</strong>
                        <input type="text"/>
                        <button type="submit">
                            Cadastrar
                        </button>

                    </form>
                </section>
            </div>      
            
        </div>
    );

};