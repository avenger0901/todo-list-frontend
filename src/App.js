import React from 'react';
import TodoApp from './TodoApp.js';
import './App.css';
import TodoLogin from './TodoLogin.js'
import { 
    BrowserRouter, 
    Route, 
    Redirect,
    Switch,
 } from 'react-router-dom';


 const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

function App() {
  return (
    <div className="App">
        <header>
            my header
        </header>
        <BrowserRouter>
            <Switch>
            <Route path='/' render={() => 
                isLoggedIn() 
                    ? <TodoApp />
                    : <Redirect to='login' />
                }/>
                 <Route path='/login' component={TodoLogin} />
                {/* <Route exact path="/" component={ TodoApp }/> */}
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;

