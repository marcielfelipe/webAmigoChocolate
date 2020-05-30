import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Groups from './pages/Groups';
import NewGroup from './pages/NewGroup';
import MyProfile from './pages/MyProfile';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/groups" component={Groups}/>
                <Route path="/newgroup" component={NewGroup}/>
                <Route path="/myprofile" component={MyProfile}/>
            </Switch>       
        </BrowserRouter>
    );
}