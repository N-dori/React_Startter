import { userService } from "../..//services/userService loacl";
import { SET_LOGGEDIN_USER, LOGOUT_USER, UPDATE_USER, SET_USERS, REMOVE_USER } from "../reducers/user.reducer";
import { cartService } from "../../services/cart.service";



export function signup(userToSignup, from, shoppingCart) {
    try {

        return async (dispatch, getState) => {
            let user = await userService.signup(userToSignup)
     
              const action = {
                  type: SET_LOGGEDIN_USER,
                  user
              }
              dispatch(action)
          
        }

    } catch (err) {
        console.log('can not signup User', err);
    }

}
export function login(credentials) {
    try {

        return async (dispatch, getState) => {
            const user = await userService.login(credentials)
            console.log('user in user action  in login func', user);
            const action = {
                type: SET_LOGGEDIN_USER,
                user
            }
            dispatch(action)
            return user
        }

    } catch (err) {
        console.log('can not login User', err);
    }
}

export function loadGuestUser() {
    try {

        return async (dispatch, getState) => {
            //checking first if the user has loginToken
            const loggdingUser = await userService.getLoggedinUser()
            if (loggdingUser) {
                return
            } else {
                const user = userService.getUserGuest()
            //  const user = await userService.signup(guest)
                       const action = {
                 type: SET_LOGGEDIN_USER,
                 user
             }
             dispatch(action)
       
            }
        }

    } catch (err) {
        console.log('can not login User', err);
    }
}


export function logout() {
    try {
        return async (dispatch, getState) => {
            // const guest = userService.getUserGuest()
            console.log('LOGOUT_USER');
            const action = {
                type: LOGOUT_USER,
               
            }
            dispatch(action)
        }

    } catch (err) {
        console.log('can not logout', err);
    }
}
export function removeUser(userId) {
    try {
        return async (dispatch, getState) => {
            const action = {
                type: REMOVE_USER,
                userId
            }
            dispatch(action)
            await userService.removeUser(userId)
        }

    } catch (err) {
        console.log('can not remove User', err);
    }
}
export function getUsers() {
    try {
        return async (dispatch, getState) => {
            const users = await userService.getUsers()
            const action = {
                type: SET_USERS,
                users
            }
            dispatch(action)
        }

    } catch (err) {
        console.log('can not logout', err);
    }
}
export function updateUser(user,from) {
    try {
        return async (dispatch, getState) => {
            const updatedUser = await userService.updateUser(user)
            if(from !== 'dashbaord'){
                console.log('inside actionnnnnnnnnn', updatedUser);
                const action = {
                    type: UPDATE_USER,
                    updatedUser
                }
                dispatch(action)

            }
        }

    } catch (err) {
        console.log('can not signup User', err);
    }
}
export function isSubEpisodeFullyWatched(userId,courseId,lastEpisode,lastSubEpisode,duration,playedSecondsRef) {
    try {
        return async (dispatch, getState) => {

            if((duration-5)<playedSecondsRef){
                const updatedUser = await userService.isSubEpisodeFullyWatched(userId,courseId,lastEpisode,lastSubEpisode)

            }
            // const action = {
            //     type: UPDATE_USER,
            //     updatedUser
            // }
            // dispatch(action)
        }

    } catch (err) {
        console.log('can not signup User', err);
    }
}

export function updateCurrTimeWacth(userId, courseId, currEpisode, currSubEpisode, currTimeWatch, videoUrl) {
    try {
        return async (dispatch, getState) => {
            const updatedUser = await userService.updateCurrTimeWacth(userId, courseId, currEpisode, currSubEpisode, currTimeWatch, videoUrl)
            const action = {
                type: UPDATE_USER,
                updatedUser
            }
            dispatch(action)
        }

    } catch (err) {
        console.log('can not signup User', err);
    }
}

export function getUserById(userId) {
    try {
        return async (dispatch, getState) => {
            const updatedUser = await userService.getUserById(userId)
            console.log('LOGOUT_USER');
            const action = {
                type: UPDATE_USER,
                updatedUser
            }
            dispatch(action)
        }

    } catch (err) {
        console.log('can not signup User', err);
    }
}
export function setLoggedinUser(user) {
    try {
        return async (dispatch, getState) => {
            const action = {
                type: SET_LOGGEDIN_USER,
                user
            }
            dispatch(action)
        }

    } catch (err) {
        console.log('can not set logged in User', err);
    }
}


