
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from './todoTypes';

export let addTodo = (mytodo) => {
    return {
        type: ADD_TODO,
        payload: {id: Math.ceil(Math.random() * 100), 
            mytodo: mytodo}
    }
}

export const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        payload: id,
    }
}

export const updateTodo = () => {
    return {
        type: UPDATE_TODO,
    }
}

// id: new Date()getTime().toString()