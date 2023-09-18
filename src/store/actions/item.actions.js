import { itemService } from "../../services/item.service local"
import { SET_ITEMS,ADD_ITEM, UPDATE_ITEM, SET_FILTER_BY, SET_SORT_BY } from "../reducers/item.reducer"

export function loadItems(){
    try{
        return async(dispatch,getState)=>{
            const items= await itemService.getItems(getState().itemModule.filterBy)
            console.log('items action',items);
            
            const action = {
                type: SET_ITEMS,
                items
            }
           dispatch(action)
    }
     
    }catch(err){
        console.log('can not load items',err);
    }
}

export function addItems(itemToAdd){
    try{

        return async(dispatch,getState)=>{
            const item= await itemService.addItems(itemToAdd)
            const action = {
                type: ADD_ITEM,
                item
            }
           dispatch(action)
    }
     
    }catch(err){
        console.log('can not load items',err);
    }
}
export function addComment(announcId,commentToAdd){
    try{

        return async(dispatch,getState)=>{
            const item= await itemService.addComment(announcId,commentToAdd)
            console.log('item in item add comment action',item);
            
            const action = {
                type: UPDATE_ITEM,
                item
            }
           dispatch(action)
    }
     
    }catch(err){
        console.log('can not load items',err);
    }
}
export function setFilterBy(filterBy){

    return (dispatch) => {
        console.log('filterBy in actions', filterBy);
            const action = {type: SET_FILTER_BY, filterBy}
            dispatch(action)
 
}
}
export function setSortBy(sortBy){

    return (dispatch) => {
        console.log('sortBy in actions', sortBy);
            const action = {type: SET_SORT_BY, sortBy}
            dispatch(action)
 
}
}



