import { id } from 'date-fns/locale';
import { combineReducers } from 'redux';
import todoReducers from './Todo/todoReducers';

const rootReducer = combineReducers({
    
    mytodo: todoReducers,
    // todoReducers,

});


export default rootReducer;