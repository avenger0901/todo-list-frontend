import React, { Component } from 'react'
import request from 'superagent';
import AddTodo from './AddToDo';

export default class TodoApp extends Component {
    //set initial state is an object of array, and todos is an empty array
    state = { todos: [],
            todoInput:'' }
    componentDidMount = async() => {
        //get the user from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        //get the data from database
        const todos = await request.get('https://mighty-garden-12963.herokuapp.com/api/todos')
        .set('Authorization', user.token);
        //after we got the data form database, now our empty todo array has something in there. In order to get the data, we have to use todo.body, because we usded superagent
        this.setState({ todos: todos.body })
    }
    handleClick = async () => {
        //we creating a newTOdo object, with random id, and the task is comefrom user, and set complete default to false.
        const newTodo = {
            // math.random() is fine here because this is a fake todo
            id: Math.random(),
            task: this.state.todoInput,
            complete: false,
        };

        const user = JSON.parse(localStorage.getItem('user'));


        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos });

        const data = await request.post(`https://mighty-garden-12963.herokuapp.com/api/todos`, {

            task: this.state.todoInput
        })
            .set('Authorization', user.token);
            const todos = await request.get('https://mighty-garden-12963.herokuapp.com/api/todos')
            .set('Authorization', user.token);
            this.setState({ todos: todos.body })
    }
    handleInput = (e) => {
        this.setState({ todoInput: e.target.value })
    }
    handleDelete = async (todo) => {
        const user = JSON.parse(localStorage.getItem('user'));

        await request.delete(`https://mighty-garden-12963.herokuapp.com/api/todos/${todo.id}`)
        //set auhorization
        .set('Authorization', user.token);
        const todos = await request.get('https://mighty-garden-12963.herokuapp.com/api/todos')
        .set('Authorization', user.token);
        this.setState({ todos: todos.body })
    }
    render() {
        console.log(this.state.todos)
       //if localstorage has an user, then continue
        if (localStorage.getItem('user')) {
        return (
            <div>
                {/* parse user's email in javascrip language. */}
                <h3>Hello {JSON.parse(localStorage.getItem('user')).email}</h3>
                {/* calling AddTodo component  */}
                <AddTodo 
                // call handleinput() function, now our todoInput is whatever user typed 
                handleInput={ this.handleInput } 
                //  // call handleClick() function, go up.
                handleClick={ this.handleClick } 
                todoInput={ this.state.todoInput } 
            />
                {
                    this.state.todos.map((todo) => <p 
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none'
                        }}
                        onClick={async () => {
                            // lets mutate! make a copy of the array in state
                        const newTodos = this.state.todos.slice();
                            // go find whichever todo we're talking about here
                        const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);

                        matchingTodo.complete = !todo.complete
                        const user = JSON.parse(localStorage.getItem('user'));
                        
                        this.setState({ todos: newTodos });
                        const data = await request.put(`https://mighty-garden-12963.herokuapp.com/api/todos/${todo.id}`, matchingTodo)
                        .set('Authorization', user.token);
                    }} key={todo.id}>
                        {todo.task}
                        <button onClick= {() => this.handleDelete(todo)} >Delete</button>
                    </p>)
                }
            </div>
            )
        }
    }
}
