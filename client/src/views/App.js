import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Search from './Search';
import VisitProfile from './VisitProfile';

class App extends React.Component{
    render(){
        return(
            <BrowserRouter >
                <Route path='/' exact component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/edit' component={EditProfile} />
                <Route path='/search/:name' component={Search}/>
                <Route path='/visit/:id' component={VisitProfile}/>
            </BrowserRouter>
        )
    }
}

export default App;