

export const ADD_TO_CART = 'ADD_TO_CART '
export const REMOVE_FORM_CART = 'REMOVE_FORM_CART '
export const SET_CART = 'SET_CART '


const INITIAL_STATE = {
  shoppingCart:[]

}
export function cartReducers(state=INITIAL_STATE, action = {} ){
  switch (action.type) {
 
    case SET_CART:
      return {
          ...state,
          shoppingCart: action.cart
      }
        case ADD_TO_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.courseId]
                
            }
        case REMOVE_FORM_CART:
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter(product => product._id !== action.productId)
            }

 
    default:
         return state
 
  } 
    
}