const coffeeList = document.querySelector('.coffees');
const loggedIn = document.querySelectorAll('.logged-in');
const loggedOut = document.querySelectorAll('.logged-out');
const accountDetails = document.querySelector('.account-details');

// show coffees
const showCoffees = (data) => {
  if (data.length) {
    let html = '';
    // sort alphabetically (ignore white spaces and small letters)
    data = data.sort((doc1, doc2) => {
      let coffee1 = doc1.data().name.trim().toLowerCase(); 
      let coffee2 = doc2.data().name.trim().toLowerCase(); 
      console.log(coffee1.name + " <> " + coffee2.name);
      if(coffee1 < coffee2) { return -1; }
      if(coffee1 > coffee2) { return 1; }
      return 0;
    });
    // show info about particular coffee
    data.forEach(doc => {
      const coffee = doc.data();
      const li = `
      <li>
        <div class='collapsible-header yellow lighten-5'>${coffee.name}</div>
        <div class='collapsible-body white'>
        <h5>roastery: </h5>${coffee.roastery}
        <h5>opinion: </h5>${coffee.opinion}
        <h5>rate: </h5>${coffee.rate}
        </div>
      </li>
      `;
      html += li
    });
    coffeeList.innerHTML = "<h5>click the name to get some info about the coffee</h5>" + html;
  } else {
    coffeeList.innerHTML = `
    <div class='sign-up'>
    <h4>sign up to join<br> our coffee community</h4>
    <button class='amber btn white-text modal-trigger' data-target='modal-signup'>sign up</button>
    </div>
    `
  }
}

// add new coffee
const addForm = document.querySelector('#add-form');
addForm.addEventListener('submit', (e) => {
  // to prevent from page refresh
  e.preventDefault();
  
  db.collection('coffees').add({
    name: addForm['name'].value,
    roastery: addForm['roastery'].value,
    opinion: addForm['opinion'].value,
    rate: addForm['rate'].value
  }).then(() => {
    const modal = document.querySelector('#modal-add');
    M.Modal.getInstance(modal).close();
    addForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// change nav if user is logged in/out
const changeNav = (user) => {
  if (user) {
    // account details
    const html = `
    <div>hello<br>you are logged in as ${user.email}</div>
    `
    accountDetails.innerHTML = html;
    // user logged in
    loggedIn.forEach(item => item.classList.remove('hide'));
    loggedOut.forEach(item => item.classList.add('hide'));
  } else {
    loggedOut.forEach(item => item.classList.remove('hide'));
    loggedIn.forEach(item => item.classList.add('hide'));
  }
}

// Materialize Modal Inititialization
document.addEventListener('DOMContentLoaded', function() {
  
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
  
});