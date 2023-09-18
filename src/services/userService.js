
import { httpService } from "./http.service"
import { localStorageService } from "./localStorage.service"


export const userService = {
    getEmptyUser,
    signup,
    login,
    // logout,
    getUsers,
    updateUser,
    getLoggedinUser,
    getUserById,
    clearUserCart,
    updateCurrTimeWacth,
    getUserGuest,
    clearGuestCart,
    isSubEpisodeFullyWatched,
    removeUser,
}



// function logout(){
//     localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
// }
async function getUsers () {
    const users = await httpService.get('user')
    return users
}  
async function removeUser (userId) {
    try{
        await httpService.delete(`user/${userId}`)
        // return users  
    }catch(err){
        console.log('err',err);
    }
}  

async function getUserById(userId) {
    try {
        const user = await httpService.get(`user/${userId}`)
        // const users = await storageService.query(USER_KEY)
        // const user = users.find(user => user._id === userId)
        // console.log('your user by id in service ',user);
        return user
    }
    catch (err) {
        console.log('could not load user by id ', err);

    }
}

async function getLoggedinUser() {
    const loggedinUser = await httpService.get('auth/loggedinUser')
    console.log('loggedinUser',loggedinUser);
    return loggedinUser

}
async function login(credentials) {
    try {
        console.log('login in service  before back end credentials', credentials);
        const loggedinUserAfterBackend = await httpService.post('auth/login', credentials)
        console.log(`loggedinUserAfterBackend`, loggedinUserAfterBackend);
        return loggedinUserAfterBackend

    } catch (err) {
        console.log(`could not login with${credentials.fname}`, err);
    }

}

async function signup(credentials) {
    console.log('sign up before back end credentials', credentials);

    const userAfterBackend = await httpService.post('auth/signup', credentials)
    console.log('sign up user  in service AfterBackend', userAfterBackend);

    return userAfterBackend
}
function getEmptyUser() {
    return {
        fname: "",
        password: "",
        email: "",
        imgUrl: '',
        isAdmin: false,
        courses: [],
        cart: [],
    }
}
function getUserGuest() {
    return {
        _id:'64abe02a8723e73efc4d4be8',
        fname: "אורח",
        password: "a",
        email: "a",
        imgUrl: 'a',
        isAdmin: false,
        courses: [],
        cart: [],
    }
}
async function updateUser(userToUpdate) {
    try {
        const user = await httpService.put('user', userToUpdate)
        console.log('updateUser function in user service', user);
    } catch (err) {
        console.log('could not update user', err);
    }
    // const updatedUser= await httpService.put(`user`,user)
    return userToUpdate

}
async function updateCurrTimeWacth(userId, courseId, episodeId, subEpisodeId, currTimeWatch, videoUrl) {
    try {
        console.log('userId', userId);
        console.log('courseId', courseId);
        console.log('episodeId', episodeId);
        console.log('subEpisodeId', subEpisodeId);
        console.log('currTimeWatch', currTimeWatch);

        //finding the user
        const userToUpdate = await getUserById(userId)
        //getting the relevent course 
        const course = userToUpdate.courses.find(course => course._id === courseId)
        // creating new key lastTimeWatch -with the vlaue we got form the component
        if (!course) {
            return
        }
        course.lastVideoWatched = {
            episode: episodeId,
            subEpisode: subEpisodeId,
            lastTimeWatched: currTimeWatch,
            videoUrl
        }

        console.log(' updated course in updateCurrTimeWacth func', course);
        // updating his courses 
        const updatedCourses = userToUpdate.courses.map(currCourse => currCourse._id === course._id ? course : currCourse)
        userToUpdate.courses = updatedCourses
        // updateing the  user
        await updateUser(userToUpdate)
        console.log(' userToUpdate in updateCurrTimeWacth func', userToUpdate);
        return userToUpdate
    } catch (err) {
        console.log('could not update Curr TimeWacth of user', err);
    }
    // const updatedUser= await httpService.put(`user`,user)

}

async function isSubEpisodeFullyWatched(userId,courseId,lastEpisode,lastSubEpisode) {
    try {
        console.log('this user has fhinshed watching another video', userId);
        const userToUpdate = await getUserById(userId)
        const courseIdx =userToUpdate.courses.findIndex(studentCourse => studentCourse._id === courseId)
      // fisrt getting the relevent user's course
        const studentCourse = userToUpdate.courses[courseIdx]
    //    console.log(' isSubEpisodeFullyWatched func in user service studentCourse:', studentCourse);
       if(!studentCourse.fullyWatched){
        // creating fullyWatched= new array of objects, each obj has the episode id and array of completed subepisodes 
           studentCourse.fullyWatched = []
           studentCourse.fullyWatched.push({episode:lastEpisode,
            subEpisodes:[lastSubEpisode] })
            const updatedCourses= userToUpdate.courses.map(course => course._id === studentCourse._id ? studentCourse : course )                                 
            userToUpdate.courses = updatedCourses
        //after updating user's courses we send it to backend     
            // console.log(' isSubEpisodeFullyWatched updated user  in not found:', userToUpdate);
        await updateUser(userToUpdate)
     
    }
       else{
        // in case user has in his course the fullyWatched key    
        // first chacking if the last episode watched is already in there    
           const foundEpisode  = studentCourse.fullyWatched.find(currEpisode => currEpisode.episode === lastEpisode)
        //    console.log(' isSubEpisodeFullyWatched func in user service found:', foundEpisode);
           if(!foundEpisode){
               // if the episode not there , we push it to the fullyWatched arr 
               studentCourse.fullyWatched.push({episode:lastEpisode,
                subEpisodes:[lastSubEpisode] })
                //finding it in the fullyWatched arr than updateing user course 
                // than updating his hole courses arr , and send to backeand 
                const episodeToAdd =studentCourse.fullyWatched.find(currEpisode => currEpisode.episode === lastEpisode)
                const updatedCourses= userToUpdate.courses.map(course => course._id === episodeToAdd._id ? episodeToAdd : course )                                 
                userToUpdate.courses = updatedCourses                                
                // console.log(' user has fully watched key but not the episode user:', userToUpdate);
                
                const res =   await updateUser(userToUpdate)                              
                // console.log(' isSubEpisodeFullyWatched func in user service updatedUser:', res);
           }else{
            // if the episode is in the fully-watched array 
            //than we just pushing to it the additional fullywatched sub episode-  to the relevent episode 
            foundEpisode.subEpisodes.push(lastSubEpisode)
            //    console.log(' user had the fully watched key and had the episode in thereisode:', foundEpisode);
               const updatedCourses= userToUpdate.courses.map(course => course._id === foundEpisode._id ? foundEpisode : course )                                 
               userToUpdate.courses = updatedCourses                                 
  
                //    console.log(' isSubEpisodeFullyWatched func in user service userToUpdate:', userToUpdate);
                 const res =  await updateUser(userToUpdate)
                   return userToUpdate

           }
       }
    } catch (err) {
        console.log('could not update if SubEpisodeFullyWatched', err);
    }
    // const updatedUser= await httpService.put(`user`,user)

}
async function clearUserCart(userId) {
    try {
        const user = await userService.getUserById(userId)
        console.log('clearUserCart servise  ', user);
        user.cart = []
        const updatedUser = await updateUser(user)
        console.log('clearUserCart servise  ', updatedUser);
        return updatedUser.cart
    } catch (err) {
        console.log('could not clear User cart ', err);
    }
    // const updatedUser= await httpService.put(`user`,user)


}
async function clearGuestCart() {
    try {
        await httpService.delete('user')
    } catch (err) {
        console.log('could clearUserCart ', err);
    }
    // const updatedUser= await httpService.put(`user`,user)


}

