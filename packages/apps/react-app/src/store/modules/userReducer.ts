//独立的reducers
interface UserState {
    users:string[];
}
//独立的actions
const initialState: UserState = {
    users: []
}

//定义action类型
const ADD_USER = 'ADD_USER';

//action函数创建 
export function addUser(user:string){

    return {
        type:ADD_USER,
        playload:user
    }
}

//独立的actions
function userReducer(state = initialState, action: any): UserState {  
    
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,users: [...state.users, action.payload]
            }
        default:
            return state;
    }
}
 export default userReducer;