
export const SET_LOGGEDIN_USER = 'SET_USER '
export const SET_USERS = 'SET_USERS '
export const ADD_USER = 'ADD_USER '
export const UPDATE_USER = 'UPDATE_USER '
export const LOGOUT_USER = 'LOGOUT_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const ADD_TO_USER_CART = 'ADD_TO_USER_CART'


const INITIAL_STATE = {
    users:null,
  loggdingUser:null

}
export function userReducers(state=INITIAL_STATE, action = {} ){
    
  switch (action.type) {
    case SET_USERS:
        return {
            ...state,
            users: action.users
        }
    case SET_LOGGEDIN_USER:
        if(!action.user){
            console.log('in reducer action.user if undefined');
            return state
        }
        return {
            ...state,
            loggdingUser: {...action.user}
        }
    
    case LOGOUT_USER:
        return {
            ...state,
            loggdingUser:null
        }
    case UPDATE_USER:
        return {
            ...state,
            loggdingUser:action.updatedUser
        }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
        case ADD_TO_USER_CART:
            return {
                ...state,
                loggdingUser:state.loggdingUser.cart.map(id => id === action.courseId ? action.courseId : id )
            }
            
            
            
            default:
        console.log('user',state.loggdingUser);
         return state
 
  } 
    
}