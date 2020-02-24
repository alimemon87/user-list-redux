import axios from "axios";
export const END_OF_RECORD = 'END_OF_RECORD';
export const USERS_STORE_RESULT = 'USERS_STORE_RESULT';
export const SCROLLING = 'SCROLLING';


export const endOfRecord = () => {
    return{
        type: END_OF_RECORD
    };
};

export const scrolling = (val) => {
    return{
        type: SCROLLING,
        payload: val
    };
};

export const saveResult = (response,page) =>{
    console.log(response);
    return {
        type: USERS_STORE_RESULT,
        users: response,
        page:page
    };
};

let page = 1;
export const usersStoreResult = () => {
    console.log(page);
    return dispatch => {
        const url = `https://reqres.in/api/users?per_page=${5}&page=${page}`
        axios.get(url)
            .then(response => {
                //dispatch(scrolling(true))
                dispatch(saveResult(response,page++));
            })
            .catch(error => {
                dispatch(saveResult(error));
            });
    }
}; 