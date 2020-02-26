import React, { Component } from 'react'
import request from 'superagent';


export default class TodoApp extends Component {
    state = { todos: [],
              newTodo: ''
    }
    componentDidMount = async() => {
        const todos = await request.get('https://mighty-garden-12963.herokuapp.com/api/todos')
        console.log(todos.body)
        this.setState({ todos: todos.body })
    }
    handleInputChange = (e) => {
        this.setState({ newTodo: e.target.value })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const addTodo = {
            "task":this.state.newTodo
        }
       const postTodo = await request.post('https://mighty-garden-12963.herokuapp.com/api/todos',addTodo)
       const todos = await request.get('https://mighty-garden-12963.herokuapp.com/api/todos')
        console.log(todos.body)
        this.setState({ todos: todos.body })
    }
    
    render() {
     
        return (
            <div>
                <input onChange={this.handleInputChange}>
                </input>
                <button onClick = {this.handleSubmit}>Submit</button>
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
                                 
                        this.setState({ todos: newTodos });
                        const data = await request.put(`https://mighty-garden-12963.herokuapp.com/api/todos/${todo.id}`, matchingTodo);
                    }} key={todo.id}>
                        {todo.task}
                    </p>)
                }
            </div>
        )
    }
}
