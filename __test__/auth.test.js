import {authLoading, createAccount, firebaseLogout, firebaseLogin} from '../utils/auth'

test('authLoading and login test', async() => {
    let output = await authLoading((s) => {})
    let account = "demo@demo.com"
    let password = "password"
    await firebaseLogin(account,password)
    await authLoading()
    expect(output).toBeUndefined();
})
test('createAccount', async () =>{
    let account = "duplicate@test.com"
    let password = "2231231232"
    createAccount(account,password).catch(e => {
        expect(typeof(e.message)).toBe('string');
    })
})
test('firebaseLogoutTest', async () =>{
    await firebaseLogout()
})