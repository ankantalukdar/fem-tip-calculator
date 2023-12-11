const input = document.querySelector('.input-custom');

input.addEventListener('input', function() {
  input.style.textAlign = 'right'; // Change alignment to right when typing
});

// ninja
// ninja
// **************************

const numberInputs = document.querySelectorAll('.max-input');

numberInputs.forEach(input => {
  input.addEventListener('input', function(event) {
    const maxValue = parseFloat(input.getAttribute('max'));
    const enteredValue = parseFloat(input.value);

    if (enteredValue > maxValue) {
      input.value = maxValue; // Reset value to the maximum if it exceeds the max attribute
    }
  });

  input.addEventListener('keydown', function(event) {
    if (event.key === '+' || event.key === '-') {
      event.preventDefault(); // Prevents typing the plus or minus symbol
    }
  });
});

// ninja
// ninja
// **************************

document.addEventListener('input', function(event) {
  if (event.target.matches('.max-input')) {
    calculate(event.target); // Pass the target element to the calculate function
  }
});

function calculate(input) {
  const customTip = parseFloat(input.value);

  if (!isNaN(customTip) && customTip >= 0) {
    input.style.borderColor = ''; // Reset border color if input is valid
    calculateTip(customTip);
  } else {
    input.style.borderColor = 'red'; // Change border color to red for invalid input
    input.value = ''; // Clear the input value
    input.placeholder = 'Invalid input'; // Optionally, show a placeholder message
  }
}

// Select all tip buttons and the custom tip input
const tipButtons = document.querySelectorAll('.bt-tip');
const customTipInput = document.getElementById('customTip');
const resetButton = document.querySelector('.bt-reset');

// Loop through each tip button to add an event listener
tipButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Set customTip input value to the selected tip percentage (without the % symbol)
    customTipInput.value = this.textContent.replace('%', '');
    calculateTip();
  });
});

// Add an event listener for the reset button
resetButton.addEventListener('click', function() {
  // Reset the custom tip input and recalculate
  customTipInput.value = '';
  calculateTip();
});

function calculateTip(tipPercentage = 0) {
  const customTipInputValue = customTipInput.value;

  if (customTipInputValue) {
    // Retrieving values from input fields
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const customTip = parseFloat(customTipInputValue);
    const numPeople = parseFloat(document.getElementById('numPeople').value) || 1;

    // Calculating tip amount and total amount
    const tipAmount = (billAmount * customTip) / 100;
    const totalAmount = billAmount + tipAmount;

    // Calculating amounts per person
    const tipAmountPerPerson = tipAmount / numPeople;
    const totalAmountPerPerson = totalAmount / numPeople;

    // Updating the displayed results
    document.getElementById('tipAmountPerPerson').innerText = `$${tipAmountPerPerson.toFixed(2)}`;
    document.getElementById('totalAmountPerPerson').innerText = `$${totalAmountPerPerson.toFixed(2)}`;
  } else {
    // If tip is not selected or custom input is empty, show default values
    document.getElementById('tipAmountPerPerson').innerText = `$0.00`;
    document.getElementById('totalAmountPerPerson').innerText = `$0.00`;
  }
}