import { applyMiddleware, combineReducers,compose, legacy_createStore as createStore } from "redux"

import thunk from "redux-thunk"
import { userReducers } from "./reducers/user.reducer"
import { cartReducers } from "./reducers/cartReducer"
import { itemReducers } from "./reducers/item.reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
       itemModule: itemReducers,
    userModule: userReducers,
 cartModule: cartReducers,
 
})
export const store = createStore(rootReducer ,composeEnhancers(applyMiddleware(thunk)))

window.gStore = store 