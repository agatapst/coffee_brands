const coffeeList = document.querySelector('.coffees');

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

// Materialize Modal Inititialization
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});