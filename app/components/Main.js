import React from 'react';
import { Route , Switch } from 'react-router-dom';
import Home from './Home';
import Books from './Books';
import Signin from './auth/signin';
import Signup from './auth/signup';
import Nav from './Nav';
import BookAdder from './BookAdder';

class Main extends React.Component {
    

    render() {
       
        return (
                <div>
                    <Nav></Nav>
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                        <Route path='/signin' component={Signin}></Route>
                        <Route path='/signup' component={Signup}></Route>
                        <Route path='/books' component={Books}></Route>
                        <Route path='/bookAdder' component={BookAdder}></Route>
                        
                    </Switch>
                                        
                </div>
            
        )
    }
};

export default Main;


