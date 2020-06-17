import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FaEye,FaUser,FaLock ,FaTimes,FaClipboardList,FaSync,FaRandom,FaPlus,FaTrash,FaUserCog,FaCalendarAlt,FaCalendarCheck,FaChartLine,FaUnlock,FaUsers,FaUserCircle,FaUserPlus,FaEdit} from 'react-icons/fa';
import grupoAmigos from '../../assets/grupoAmigos.svg';
import NavBar from  '../../components/navbar';
import './styles.css';
import api from '../../services/api';
import PopUp from'../../components/PopUp';
import PopUpDesejo from'../../components/PopUpDesejo';
import { parseISO, isAfter, format, formatRelative,formatDistance } from 'date-fns';

export default function Groups(){
    const [popup,setpopup]=useState(false);
    const [popupDesejo,setpopupDesejo]=useState(false);
    const history=useHistory();
    const [Details, setDetails]=useState(false);
    const [Admin, setAdmin]=useState(false);
    const [Sortear, setSortear]=useState(false);
    const [MostrarParticipantes, setMostrarParticipantes]=useState(false);
    const [MostrarAmigo, setMostrarAmigo]=useState(false);
    const [MostrarListaAmigo, setMostrarListaAmigo]=useState(false);
    const [ListaAmigo, setListaAmigo]=useState([]);
    const [groups, setGroups]=useState([]);
    const [oneGroup,setOneGroup]=useState([]);
    const [participantes,setParticipantes]=useState([]);
    const [idGroup,setidGroup]=useState('');
    const [NameGroup,setNameGroup]=useState('');
    const [Amigo,setAmigo]=useState('');


    const auth = { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}};
    var dataId= {data: {_id:NameGroup}};
    
    useEffect(()=>{
        api.get('gruposusuario',auth)
        .then(response=>{
            setGroups(response.data);
            
        })
    },[localStorage.token]);

    async function getGrupos(){
        setDetails(!Details);
        const responseGrupos=await api.get('gruposusuario',auth);
        setGroups(responseGrupos.data);  
    }

    async function getParticipantes(){
        setMostrarParticipantes(!MostrarParticipantes);
        const response =await api.get('participantes/'+idGroup,auth);
        setParticipantes(response.data);
    }

    function getDetails(group){
        getParticipantes();
        setMostrarParticipantes(!MostrarParticipantes);
        setDetails(true);
        setOneGroup(group);
        setidGroup(group._id);
        setNameGroup(group.nome);
        localStorage.setItem('_id',group._id)
        if(group.criadoPor==localStorage.nome){
            setAdmin(true);
        }
    }
    function handleParticipat(oneGroup){
        localStorage.setItem('_id',idGroup);
        localStorage.setItem('nomeGrupo',NameGroup);
        history.push('/addparticipant');
    }
    function handleEditGroup(){
        localStorage.setItem('_id',idGroup);
        history.push('/editgroup');
    }
    async function handleDeleteGroup(){
        setpopup(!popup);
    }
    
    function handleLista(){
        setpopupDesejo(!popupDesejo);
    }
    async function handleSorteio(){
        const responseSorteio = api.get('grupo/sorteio/'+ localStorage._id,auth);
        atribuirAmigo();
        
    }
    function closeDetails(){
        setDetails(!Details);
        localStorage.removeItem('_id');
    }
    
    function atribuirAmigo(){
        setMostrarAmigo(!MostrarAmigo);
        participantes.map(item=>{
            
            if(item.email==localStorage.email){
                setAmigo(item.amigo);
            }
        })
    }
    function getListaAmigo(){
        setMostrarListaAmigo(!MostrarListaAmigo);
        participantes.map(part=>{
            if(part.nome==Amigo){
                setListaAmigo(part.listaDesejos);
            }
        })
        console.log(ListaAmigo);
    }
    
    return(
        <div className="geral" >
            <NavBar/>
            {
                popupDesejo&&<PopUpDesejo/>
            }
            {
                popup&&<PopUp/>
            }
            <div className="container-groups" >
                
 
                <section className="groups-container">
                    <section className="title">
                        <section>
                            <FaSync size={20} color="#fff" onClick={getGrupos}/>
                        <h1>
                            Seus grupos: {groups.length}
                        </h1>
                        
                        </section>
                        <button onClick={()=>history.push('/newgroup')}>
                            <FaPlus size={20} color="#037D25"/>
                            Cadastrar Grupo
                        </button>
                    </section>
                   
                    <ul>
                        {groups.map(group=>(
                            <li key={group._id} onClick={()=>getDetails(group)}>
                                <div className='group-header'>
                                    <h2>{group.nome}</h2> 
                                                           
                                </div>
                                <section>
                                    <FaUserCog size={23} color="#002740"/>
                                    <strong>Criado por:</strong>
                                    <p>{group.criadoPor}</p>
                                </section>
                                <section>
                                    {
                                        group.status=='Em Aberto' &&
                                        <FaUnlock size={23} color="002740"/>
                                    }
                                    {
                                        group.status=='Sorteado' &&
                                        <FaLock size={23} color="002740"/>
                                    }
                                    
                                    <strong>Status do sorteio:</strong>
                                    <p>{group.status}</p>
                                </section>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="img-container" >
                    
                {
                    !Details && <img src={grupoAmigos} alt="grupo Amigos"/>        
                }
                {
                    Details && 
                    <div className="groupDetails-container">
                        <div className='group-details-header'>
                            <FaTimes 
                                size={23} 
                                color="#002740" 
                                onClick={closeDetails} 
                                style={{marginLeft:'15px',marginTop:'12px'}}
                            />
                            <h2>{oneGroup.nome}</h2>  
                            
                            <section>
                                {
                                    !Admin && 
                                    <FaClipboardList size={23} color="#44231A" onClick={handleLista}/>
                                }
                                {
                                    Admin && 
                                    <section>
                                        <FaClipboardList size={23} color="#44231A" onClick={handleLista}/>
                                        <FaUserPlus size={23} color="#099630" onClick={(oneGroup)=>handleParticipat(oneGroup)}/>
                                        <FaEdit size={23} color="#002740" onClick={handleEditGroup}/>
                                        <FaTrash size={20} color="#D62525" onClick={handleDeleteGroup}/>
                                    </section>
                                }
                                
                                
                            </section>                  
                            
                        </div>
                        <section className="itens">
                            
                            <section>
                                <FaUserCog size={23} color="#002740"/>
                                <strong>Criado por:</strong>
                                <p>{oneGroup.criadoPor}</p>
                            </section>
                            <section>
                                <FaCalendarAlt size={23} color="002740"/>
                                <strong>Data do sorteio:</strong>
                                <p>{oneGroup.dataSorteio}</p>
                            </section>
                            <section>
                                <FaCalendarCheck size={23} color="002740"/>
                                <strong>Data do evento:</strong>
                                <p>{oneGroup.dataEvento}</p>
                            </section>
                            <section>
                                <FaChartLine size={23} color="002740"/>
                                <strong>Faixa de preço:</strong>
                                <p>R${oneGroup.valorMinimo} - R${oneGroup.valorMaximo}</p>
                            </section>
                            <section>
                                <FaUnlock size={23} color="002740"/>
                                <strong>Status do Sorteio:</strong>
                                <p>{oneGroup.status}</p> 
                            </section>
                            <section style={{cursor:'pointer'}}>
                                <FaUsers size={23} color="002740" />
                                <strong>Participantes:</strong>
                                <FaEye size={23} color="077826" onClick={getParticipantes}/>
                            </section>
                            {
                                !MostrarParticipantes &&
                                <div></div>
                            }       
                            {
                                MostrarParticipantes &&
                                <ul>
                                    {participantes.map(participante=>(
                                        <li key={participante._id}>
                                            <FaUserCircle size={23} color="002740"/>
                                            <p>{participante.nome}</p>
                                        </li>
                                    ))
                                    }                          
                                </ul>

                            }
                            <section style={{cursor:'pointer'}}>
                                <FaUser size={23} color="002740" />
                                <strong>Amigo: 
                                    {
                                        !MostrarAmigo && 
                                        <p></p>
                                    }{
                                        MostrarAmigo &&
                                        <strong>{Amigo}</strong> 
                                    }
                                        
                                </strong>
                                
                                
                                <FaEye size={23} color="077826" onClick={atribuirAmigo}/>
                                <FaClipboardList size={23} color="AB1E1E"onClick={getListaAmigo}/>
                            </section>
                            <section>
                                
                                {
                                    !MostrarListaAmigo &&
                                    <p></p>
                                }
                                {
                                    MostrarListaAmigo && 
                                    <section>
                                        <ul className='lista-amigo'>
                                            {ListaAmigo.map(item=>(
                                                <li>
                                                    <p>{item}</p>
                                                </li>
                                            ))
                                            }                          
                                        </ul>
                                    </section>
                                    
                                }

                            </section>
                              
                        </section>
                        

                         
                        <div className="float-button" 
                                onMouseOver={() => setSortear(true)} 
                                onMouseOut={() => setSortear(false)} 
                                onClick={handleSorteio}    
                        >
                            {Sortear ? "Sortear" : ""}
                            <FaRandom size="20px" />
                        </div>
                       
                        
                       
                    </div>
                }
                   
                    
                </section>
            </div>
        </div>
    );
};

