const initialState ={
    profile :{},
    loggedIn : false
}

const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'LOGGED_IN':
            return {
                ...state,
                loggedIn : true,
                profile : action.profile,
            }
        case 'LOGGED_OUT':
            return{
                ...state,
                loggedIn : false,
                profile : {}
            }
        default :
            return state
    }
}

export default authReducer