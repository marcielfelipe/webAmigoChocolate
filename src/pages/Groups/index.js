import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FaRandom,FaPlus,FaTrash,FaUserCog,FaCalendarAlt,FaCalendarCheck,FaCheck,FaChartLine,FaUnlock,FaUsers,FaUserCircle, FaCheckDouble,FaUserPlus,FaEdit} from 'react-icons/fa';
import grupoAmigos from '../../assets/grupoAmigos.svg';
import NavBar from  '../../components/navbar';
import ReactDOM from 'react-dom';
import './styles.css';




export default function Groups(){
    const history=useHistory();
    const [Details, setDetails]=useState(false);
    const [Sortear, setSortear]=useState(false);
    useEffect(() => {})

    return(
        <div className="geral">
            <NavBar/>
            <div className="container">
                <section className="groups-container">
                    <section className="title">
                        <h1>Seus grupos:</h1>
                        <button onClick={()=>history.push('/newgroup')}>
                            <FaPlus size={20} color="#037D25"/>
                            Cadastrar Grupo
                        </button>
                    </section>
                   
                    <ul>
                        <li onClick={()=>setDetails(!Details)}>
                            <div className='group-header'>
                                <h2>Grupo 1</h2>                          
                                <FaTrash size={20} color="#D62525"/>
                            </div>
                            <section>
                                <FaUserCog size={23} color="#002740"/>
                                <strong>Criado por:</strong>
                                <p>Usuário</p>
                            </section>
                            <section>
                                <FaCalendarAlt size={23} color="002740"/>
                                <strong>Data do sorteio:</strong>
                                <p>10/10/2021</p>
                            </section>
                        </li>
                        

                        
                    </ul>
                </section>

                <section className="img-container">
                    
                {
                    !Details && <img src={grupoAmigos} alt="grupo Amigos"/>        
                }
                {
                    Details && 
                    <div className="groupDetails-container">
                        <div className='group-details-header'>
                            <h2>Grupo 1</h2>  
                            <section>
                                <FaUserPlus size={23} color="#099630"/>
                                <FaEdit size={23} color="#002740"/>
                                <FaTrash size={20} color="#D62525"/>
                            </section>                  
                            
                        </div>
                        <section className="itens">
                            
                            <section>
                                <FaUserCog size={23} color="#002740"/>
                                <strong>Criado por:</strong>
                                <p>Usuário</p>
                            </section>
                            <section>
                                <FaCalendarAlt size={23} color="002740"/>
                                <strong>Data do sorteio:</strong>
                                <p>10/10/2020</p>
                            </section>
                            <section>
                                <FaCalendarCheck size={23} color="002740"/>
                                <strong>Data do evento:</strong>
                                <p>10/12/2020</p>
                            </section>
                            <section>
                                <FaChartLine size={23} color="002740"/>
                                <strong>Faixa de preço:</strong>
                                <p>R$10,00 - R$50,00</p>
                            </section>
                            <section>
                                <FaUnlock size={23} color="002740"/>
                                <strong>Status do Sorteio:</strong>
                                <p>Em aberto</p> 
                            </section>
                            <section>
                                <FaUsers size={23} color="002740"/>
                                <strong>Participantes:</strong>
                            </section>

                            <ul>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante 1</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante 2</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante 3</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante 4</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante 2</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante 3</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante 4</p>
                                </li>
                                
                            </ul>

                        </section>

                        <Link to="/registerdraw">
                        <div className="float-button" 
                                onMouseOver={() => setSortear(true)} 
                                onMouseOut={() => setSortear(false)} >
                            {Sortear ? "Sortear" : ""}
                            <FaRandom size="20px" />
                        </div>
            </Link>
  
                            
                        
                    
                    </div>
                }
                   
                    
                </section>
            </div>
        </div>
    );
};

