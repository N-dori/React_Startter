
export const SET_ITEMS = 'SET_ITEMS'
export const ADD_ITEM = 'ADD_ITEM '
export const ADD_COMMENT = 'ADD_COMMENT '
export const UPDATE_ITEM = 'UPDATE_ITEM '
export const REMOVE_ITEMS = 'REMOVE_ITEMS '
export const SET_FILTER_BY = 'SET_FILTER_BY '
export const SET_SORT_BY = 'SET_SORT_BY'


const INITIAL_STATE = {
     items:null,
        filterBy:{
        title:"",
        price:0,
        content:'',
        sortBy:""}
        

}
export function itemReducers(state=INITIAL_STATE, action = {} ){
  switch (action.type) {
    
    case SET_ITEMS:
        return {
            ...state,
            items: action.items
        }
    
    case ADD_ITEM:
        console.log('ADD_ITEM reducer',action.item);
        
        return {
            ...state,

            items: [...state.items, action.item]
        }
    case REMOVE_ITEMS:
        return {
            ...state,
            items: state.items.filter(item => item._id !== action.itemId)
        }
    case UPDATE_ITEM:
        return {
            ...state,
            items: state.items.map(item => item._id === action.item._id ? action.item : item )
        }
    case SET_FILTER_BY:
        return {
            ...state,
         filterBy:{...action.filterBy}
        }
    case SET_SORT_BY:
        return {
            ...state,
         sortBy:{...action.sortBy}
        }
        
       
  
    default:
         return state
 
  } 
    
}