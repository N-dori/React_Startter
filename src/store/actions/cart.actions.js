import { cartService } from "../../services/cart.service"
import { courseService } from "../../services/course.service";
import { userService } from "../../services/userService";
import { SET_CART, REMOVE_FORM_CART, ADD_TO_CART } from "../reducers/cartReducer"
import { SET_USER } from "../reducers/user.reducer";

export function loadCart() {
    try {

        return async (dispatch, getState) => {
            const userId = getState()?.userModule.loggdingUser?._id
            const courses = getState()?.couresModule.courses
            let cart
            if (userId && courses) {
                console.log('loadCart : inside userId && courses ', userId);
                if (userId === '64abe02a8723e73efc4d4be8') {
                    let guestCourses = []
                    const gustCart = getState().userModule.loggdingUser.cart
                    gustCart.forEach(courseId => {
                        const course = courses.find(course => course._id === courseId)
                        if (course) {
                            guestCourses.push(course)
                        }
                    })
                    cart = guestCourses
                } else {
                    const userCart = await cartService.loadShoppingCart(courses, userId)
                    cart = userCart
                }

            }
            else {
                const courses = await courseService.getCourses(getState().couresModule.filterBy)
                let user = await userService.getLoggedinUser()
                console.log('user in load cart - action', user);
                if (!user) {
                    user = userService.getUserGuest()
                    cart = user.cart
                } else {
                    const userCart = await cartService.loadShoppingCart(courses, user._id)
                    cart = userCart

                }

            }
            //cart is an array with courses 
            //TODO: save to cart mini course
            // console.log('cart in service',cart);
            const action = {
                type: SET_CART,
                cart
            }
            dispatch(action)
        }

    } catch (err) {
        console.log('can not load cart', err);
    }
}
export function removeProduct(productId, userId) {
    try {

        return async (dispatch, getState) => {
            const user = getState()?.userModule.loggdingUser
            if(user){
                if (user._id === '64abe02a8723e73efc4d4be8') {
    
                    const idx = user.cart.findIndex(product => product._id === productId)
                    user.cart.splice(idx, 1)
    
                    const action = {
                        type: SET_USER,
                        user
                    }
                    dispatch(action)
    
                }

            }

            console.log('removeProduct ', userId);
            const cart = await cartService.removeFromUserCart(productId, userId)
            console.log('cart after removeing', cart);

            const action = {
                type: REMOVE_FORM_CART,
                productId
            }
            dispatch(action)



        }

    } catch (err) {
        console.log('can not load cart', err);
    }
}
export function clearCart(userId) {
    try {

        return async (dispatch, getState) => {
            let cart = []
            const action = {
                type: SET_CART,
                cart
            }
            dispatch(action)
        }
    } catch (err) {
        console.log('can not load cart', err);
    }
}
export function addToUserCart(courseId) {
    try {

        return async (dispatch, getState) => {
            const userId = getState()?.userModule.loggdingUser?._id
            if (userId === '64abe02a8723e73efc4d4be8') {
                const user = getState().userModule.loggdingUser
                const isFound = user.cart.includes(courseId)
                console.log('is course found in  user cart ', isFound);
                if (!isFound) {
                    user.cart.push(courseId)

                    const action = {
                        type: SET_USER,
                        user
                    }
                    dispatch(action)
                } else {
                    return
                }


            } else {
                if (userId) {
                    await cartService.addToUserCart(courseId, userId)
                } else {
                    const user = await userService.getLoggedinUser()
                    await cartService.addToUserCart(courseId, user._id)
                }
            }
        }

    } catch (err) {
        console.log('can not addToUserCart cart', err);
    }
}


