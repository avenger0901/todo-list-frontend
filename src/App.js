import React from 'react';
import TodoApp from './TodoApp.js';
import './App.css';
import TodoLogin from './TodoLogin.js'
import { 
    BrowserRouter, 
    Route, 
    Redirect,
 } from 'react-router-dom';


 const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));
 
 function App() {
  return (
    <div className="App">
       
        <h1>
           What do you want to complish today?
        </h1>
       
        <BrowserRouter>
            <Route exact path='/' render={() => 
                isLoggedIn() 
                    ? <TodoApp />
                    : <Redirect to='/login' />
                }/>
                 <Route exact path='/login' component={TodoLogin} />
        </BrowserRouter>
      
    </div>
  );
}

export default App;

