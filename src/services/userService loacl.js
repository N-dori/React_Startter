
import { storageService } from "./async-storage.service"
import { httpService } from "./http.service"
import { imgService } from "./imgService"
import { localStorageService } from "./localStorage.service"
import { utilService } from "./util.service"

export const userService = {
    getEmptyUser,
    signup,
    login,
    logout,
    updateUser,
    vrifyPassword,
    getLoggedinUser,
    getUserById,
    clearUserCart,
    updateCurrTimeWacth,

}
const USER_KEY = 'userDB'
const users=utilService.loadFromStorage(USER_KEY) || _setUsers()
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

// const user = null
async function _setUsers () {
    localStorageService.store(USER_KEY , _createUsers())
}

function logout(){
    localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

 function vrifyPassword(id,password) {
        return new Promise((resolve,reject) => {
            const users = localStorageService.load(USER_KEY)
            console.log('users',users);
            const user = users.find( user => user._id === id )
            console.log('user',user);
            if(user.password === password){
                resolve(user) 
            }else{
                resolve(false)
            }
                
              
                    })
    
}
async function getUserById(userId) {
    try{
    const user = await httpService.get(`user/${userId}`)
    // const users = await storageService.query(USER_KEY)
    // const user = users.find(user => user._id === userId)
    console.log('your user by id in service ',user);
return user
    } 
    catch(err){
        console.log('could not load user by id ',err);
        
    }
}

async function  getLoggedinUser() {
const loggedinUser =  await  httpService.get('auth/loggedinUser')
console.log('loggedinUser',loggedinUser);
return loggedinUser
     
}
async function login (credentials) {
    try{
        console.log('login in service  before back end credentials',credentials);
        const loggedinUserAfterBackend= await httpService.post('auth/login',credentials)
        console.log(`loggedinUserAfterBackend`,loggedinUserAfterBackend);
        return loggedinUserAfterBackend

    }catch(err){
        console.log(`could not login with${credentials.fname}`,err);
    }
    
}

async function signup(credentials) {
    console.log('sign up before back end credentials',credentials);
    
    const user = await  storageService.post(USER_KEY,credentials)
    
    console.log('sign up user  in service AfterBackend',user)

    localStorageService.store(STORAGE_KEY_LOGGEDIN_USER, user)
   return user
}
function getEmptyUser() {
    return {
        fname: "",
        password:"",
        email: "",
        imgUrl:'',
        isAdmin:false,
        courses:[],
        cart: [],
    }
}
async function updateUser(userToUpdate){
    try{
        const users = await storageService.query(USER_KEY)

        const updatedUsers = users.map(currUser => currUser._id === userToUpdate._id ? userToUpdate : currUser )
        localStorageService.store(USER_KEY,updatedUsers)
      const loggedinUser =  localStorageService.load(STORAGE_KEY_LOGGEDIN_USER)
       userToUpdate.courses.forEach(course => {
        if(!loggedinUser.courses){
            loggedinUser.courses =[]
        }
        loggedinUser.courses.push(course._id)
       });
      localStorageService.store(STORAGE_KEY_LOGGEDIN_USER,loggedinUser)
      console.log(' update loggedinUser', loggedinUser );
    }catch(err) {
        console.log('could not update user', err );
    }
    // const updatedUser= await httpService.put(`user`,user)
return userToUpdate
  
}
async function updateCurrTimeWacth(userId,courseId, episodeId, subEpisodeId,currTimeWatch,videoUrl){
    try{
        console.log('userId',userId);
        console.log('courseId',courseId);
        console.log('episodeId',episodeId);
        console.log('subEpisodeId',subEpisodeId);
        console.log('currTimeWatch',currTimeWatch);
        
        //finding the user
        const userToUpdate = await getUserById(userId)
        //getting the relevent course 
       const course = userToUpdate.courses.find(course=> course._id===courseId)
      // creating new key lastTimeWatch -with the vlaue we got form the component
      if(!course){
        return
      }
       course.lastVideoWatched = {
        episode:episodeId,
        subEpisode:subEpisodeId,
        lastTimeWatched:currTimeWatch,
        videoUrl
                                  }                                                 
                                                                                 
       console.log(' updated course in updateCurrTimeWacth func', course );
       // updating his courses 
       const updatedCourses = userToUpdate.courses.map(currCourse => currCourse._id === course._id ? course : currCourse )
      userToUpdate.courses = updatedCourses
      // updateing the  user
       updateUser(userToUpdate)
       console.log(' userToUpdate in updateCurrTimeWacth func', userToUpdate );
       return userToUpdate
    }catch(err) {
        console.log('could not update Curr TimeWacth of user', err );
    }
    // const updatedUser= await httpService.put(`user`,user)
  
}
async function clearUserCart(userId){
    try{
        const user = await userService.getUserById(userId)
        console.log('clearUserCart servise  ', user );
        user.cart = [] 
      const updatedUser =   await updateUser(user)
        console.log('clearUserCart servise  ', updatedUser );
      return updatedUser.cart
    }catch(err) {
        console.log('could not clear User cart ', err );
    }
    // const updatedUser= await httpService.put(`user`,user)

  
}
function _createUsers(){
const users =[
    {
        _id:utilService.makeId(3),
        fullname:'ella',
        username:'',
        password:'123',
        email:'ella@gmail.com',
        imgUrl:'',
        courses:[{
        courseId:"",
        courseImgUrl:"",
        courseTitle:'',
        }] ,
        cart:[]   
    },
    {
        _id:utilService.makeId(3),
        fullname:'nadav',
        username:'',
        password:'111',
        email:'nadav@gmail.com',
        imgUrl:'',
        courses:[{
        courseId:"",
        courseImgUrl:"",
        courseTitle:'',
        }]    
    },
]
return users
}
