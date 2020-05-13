import { combineReducers } from 'redux';
import shopReducer from './shop';

const rootReducer = combineReducers({
    shop: shopReducer
})

export default rootReducer;
