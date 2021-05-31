
import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from './todoTypes';

// {id: 1, summary: 'Purchase Notebook', desc: 'description here', myPriority: 'low', createdOn: '2021-05-16', dueBy: '2021-05-16', done: false},
// {id: 2, summary: 'Buy', desc: 'buy something', myPriority: 'normal', createdOn: '2021-05-16', dueBy: '2021-05-16', done: false},

const initialState = {
    todoss: []

}

const reducer = (state = initialState, action) => {
    let newTodoss;
    console.log('Actionss', action.payload)
    switch(action.type) {

        // case ADD_TODO:
        
        //     newTodoss = [...state];
        //     newTodoss.push(action.payload);
        //     return newTodoss;
        

        case ADD_TODO:
            const {id, mytodo} = action.payload;
        return {
            ...state,
            todoss: [
                ...state.todoss,
                {
                    id: id,
                    mytodo: mytodo
                }
            ]
        }

        case DELETE_TODO:
            // newTodoss = [...state];
            // newTodoss = newTodoss.filter(mytodo => mytodo.id !== action.payload)
            // return newTodoss;

            const newItem = state.todoss.filter((mytodo) => mytodo.id !== action.payload)

            return {
                ...state,
               todoss: newItem
            }

        // case UPDATE_TODO:
        //     newTodoss = [...state]
        //     let index = -1
        //     for(let i = 0; i < newTodoss.length; i++){
        //         index++;
        //         if(newTodoss[i].id == action.payload.id){
        //             break;
        //         }
        //     }
        //     if(index != -1){
        //         newTodoss[index] = action.payload;
        //         return newTodoss;
        //     }
            

        default: return state;
    }
}
// {console.log(action.payload)}
// export const { newTodoss } = todoActions

export default reducer


// what are the inline inline block and block element search tags