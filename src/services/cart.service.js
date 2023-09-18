import { userService } from "./userService"
// const cart_DB= 'cart'



export const cartService = {
    loadShoppingCart,
    addToUserCart,
    removeFromUserCart,
    clearGuestCart,
}

async function loadShoppingCart (courses,userId) {
    let userCourses = []
    if(userId){
        const user = await userService.getUserById(userId)
        if(user){
            if(!user.cart)return
            const { cart } = user 
            cart.forEach( courseId =>{
            const course = courses.find(course => course._id === courseId)
            if(course){
                userCourses.push(course)
            }
            }  )

        }else{
            return userCourses
        }

    }
    // const userCourses = await _getCartCourses()
    console.log('userCourses',userCourses);
    return userCourses
    // utilService.saveToStorage(cart_DB,courses )

}

async function clearGuestCart () {
    await userService.clearGuestCart()
}

async function addToUserCart(couresId, userId) {
    try{

    const user = await userService.getUserById(userId)
    // chacking that user dont have the same course more than once 
    const found =  user.cart.find(currCourseId=>currCourseId === couresId)
    if(!found){
        user.cart.push(couresId) 
        const updatedUser =  await userService.updateUser(user)
        // console.log('updatedUser after backend  in cart service',user);
        return  updatedUser.cart
    }else {
        return
    }
   
    } 
    catch(err){
        console.log('could not add To User Cart',err);
        
    }
}
async function removeFromUserCart(courseId,userId) {
    try{
        if(userId === '64abe02a8723e73efc4d4be8'){
            return 
        }
    console.log('couresId',courseId)

    const user = await userService.getUserById(userId)
    console.log('user removeFromUserCart',user);
    
    const idx= user.cart.findIndex(course => course._id === courseId)
    user.cart.splice(idx,1)
    const updatedUser =  await userService.updateUser(user)
   
        return  updatedUser.cart
    } 
    catch(err){
        console.log('could not add To User Cart',err);
        
    }
}