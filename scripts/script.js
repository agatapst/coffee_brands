const coffeeList = document.querySelector('.coffees');
const loggedIn = document.querySelectorAll('.logged-in');
const loggedOut = document.querySelectorAll('.logged-out');

// show coffees
const showCoffees = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const coffee = doc.data();
      const li = `
        <li>
          <div class='collapsible-header grey lighten-4'>${coffee.name}</div>
          <div class='collapsible-body white'><h5>roastery: </h5>${coffee.roastery}</div>
          <div class='collapsible-body white'><h5>opinion: </h5>${coffee.opinion}</div>
          <div class='collapsible-body white'><h5>rate: </h5>${coffee.rate}</div>
        </li>
        `;
        html += li
    });
    coffeeList.innerHTML = html;
  } else {
    coffeeList.innerHTML = '<h5>login to view coffees</h5>'
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