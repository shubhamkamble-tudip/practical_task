import React, { useState } from 'react'

function TableTodo() {
    const [todos, setTodos] = useState([
        {Id: '1', Title: 'Purchase something', Status: 'Pending'},
        {Id: '2', Title: 'Push your code to github', Status: 'Done'}
    ])

    return (
        <div>
            <h1>TodoList</h1> 
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.Id}>
                            <td>{todo.Id}</td>
                            <td>{todo.Title}</td>
                            <td>{todo.Status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>       
        </div>
    )
}

export default TableTodo
