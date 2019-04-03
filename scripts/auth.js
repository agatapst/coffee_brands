
// sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    // to prevent from page refresh
    e.preventDefault(); 

    // get info about the user (from the signup form)
    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    // sign up the user
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here
        var errorMessage = error.message;
        alert(errorMessage)
    });
    
    // let the modal close and reset the form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
}); 

// login 
const loginForm = document.querySelector('#login-form');
signupForm.addEventListener('submit', (e) => {
    // to prevent from page refresh
    e.preventDefault(); 

    // get info about the user (from the signup form)
    const email = signupForm['login-email'].value
    const password = signupForm['login-password'].value

    // sign up the user
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here
        var errorMessage = error.message;
        alert(errorMessage)
    });
    
    // let the modal close and reset the form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
}); 