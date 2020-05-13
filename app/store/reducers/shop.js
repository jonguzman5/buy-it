import * as actionTypes from '../../types/shop';

const ShopState = {
    budget: 0,
    category: '',
    imageURI: '',
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SELECT_BUDGET:
            return {
                ...state,
                budget: action.payload
            }
        case actionTypes.SELECT_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case actionTypes.SET_IMAGE:
            return {
                ...state,
                imageURI: action.payload
            }                                    
        default:
            return state;
    }    
}

export default reducer;