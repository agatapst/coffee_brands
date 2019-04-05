// sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    // to prevent from page refresh
    e.preventDefault(); 

    // get info about the user (from the signup form)
    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).catch(err => {
        alert(err.message)
    });
    
    // let the modal close and reset the form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
}); 

// login 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    // to prevent from page refresh
    e.preventDefault(); 

    // get info about the user (from the signup form)
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value

    // sign up the user
    auth.signInWithEmailAndPassword(email, password).catch(err => {
        alert(err.message)
    });
    
    // let the modal close and reset the form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
});

// logout 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut().then(function() {
    // Sign-out successful.
    }).catch(err => {
        // An error happened.
        alert(err.message);
    });
});

// listen to auth status changes -> show data only for logged users
let coffeesListener;
auth.onAuthStateChanged(user => {
    if (user) {
        changeNav(user);
        // get data
        coffeesListener = db.collection('coffees').onSnapshot(snapshot => {
            showCoffees(snapshot.docs);
        }, error => { 
            console.log("Error: " + error.message) 
        });
    } else {

        if(coffeesListener) {
            // unsubscribe from coffee collection -> if user is logged in for the first time,
            // it is not taken into consideration
            coffeesListener();
        }
        changeNav(user);
        showCoffees([]);
    }
});