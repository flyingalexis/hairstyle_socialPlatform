export const storeLoginState = auth => {
    return {type: 'LOGIN', auth: auth}
}

export const cleanLoginState = auth => {
    return {type: 'LOGOUT', auth: auth}
}

export const updateLoginState = updates => {
    return {type: 'UPDATE', updates: updates}
}