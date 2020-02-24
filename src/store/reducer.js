import * as actionTypes from './actions/actions';

const initialStore={
    endOfRecords: false,
    users:[],
    totalPages: null,
    scrolling: false,
    page: 1
}

const reducer = (state =initialStore, action ) =>{
    switch(action.type){
        case actionTypes.END_OF_RECORD:
            return{
                ...state,
                endOfRecords: state.endOfRecords=true
            }
        case actionTypes.USERS_STORE_RESULT:
            return{
                ...state,
                users: [...state.users,action.users.data.data], //state.users.concat(action.users.data.data),
                totalPages: action.users.data.total_pages,
                page: action.page,
            }
        case actionTypes.SCROLLING:
            return{
                ...state,
                scrolling: action.payload
            }
        default:
            return state;
    }
    
};

export default reducer;