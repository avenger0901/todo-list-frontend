import React, { Component } from 'react'
import request from 'superagent';
import AddTodo from './AddToDo';

export default class TodoApp extends Component {
    state = { todos: [] }
    componentDidMount = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const todos = await request.get('https://mighty-garden-12963.herokuapp.com/api/todos')
        .set('Authorization', user.token);
        this.setState({ todos: todos.body })
    }
    handleClick = async () => {
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
    }
    handleInput = (e) => {
        this.setState({ todoInput: e.target.value })
    }
    render() {
        console.log(this.state.todoInput)
        if (localStorage.getItem('user')) {
        return (
            <div>
                <h3>Hello {JSON.parse(localStorage.getItem('user')).email}</h3>
                <AddTodo 
                todoInput={ this.state.todoInput } 
                handleClick={ this.handleClick } 
                handleInput={ this.handleInput } 
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
                    </p>)
                }
            </div>
            )
        }
    }
}