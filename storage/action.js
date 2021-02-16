export const logged = (profile) =>({
    type :'LOGGED_IN',
    profile
})

export const loggedOut = () =>({
    type :'LOGGED_OUT'
})
