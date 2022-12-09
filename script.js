// variables
const billInput = document.getElementById('bill-input')
const percentageBoxes = document.querySelectorAll('.box')
const tipInput = document.getElementById('tip-input')
const numberOfPeopleInput = document.getElementById('people-input')
const numberOfPeopleDiv = document.querySelector('.number-of-people')
const tipOutput = document.getElementById('tip-output')
const totalOutput = document.getElementById('total-output')
const resetButton = document.getElementById('reset-button')


// event listeners
billInput.addEventListener('input', setBillValue);
tipInput.addEventListener('input', setCustomValue);
numberOfPeopleInput.addEventListener('input', setPeopleValue);
resetButton.addEventListener('click', restValue);
percentageBoxes.forEach(btn => {
  btn.addEventListener('click', setBtnValue);
});

let billValue;
let tipValue;
let peopleValue;


function inti() {
    billValue = 0.0;
    peopleValue = 0;
    tipValue = 0.15;
  }
  
inti();

function setBillValue() {
    billValue = parseFloat(billInput.value).toFixed(2);
    calculateTip();
}

function restActiveBtn() {
    percentageBoxes.forEach(btn => {
      btn.classList.remove('active');
    });
}

function setPeopleValue() {
    peopleValue = parseFloat(numberOfPeopleInput.value);
  
    if (peopleValue < 1 || peopleValue == '') {
        numberOfPeopleDiv.classList.add('error')
    } else{
        numberOfPeopleDiv.classList.remove('error')
        calculateTip();
    }
    //   text.classList.add('hidden');
    //   inputPeople.classList.remove('error');
  }

function setBtnValue(e) {
    e.preventDefault();
    restActiveBtn();
    percentageBoxes.forEach(btn => {
      if (e.target.innerText === btn.innerText) {
        btn.classList.add('active');
        tipValue = parseFloat(btn.innerText) / 100;
      }
    });
  
    calculateTip();
  }


  function setCustomValue() {
    tipValue = parseFloat(tipInput.value / 100);
    calculateTip();
  }

  function calculateTip() {
    if (peopleValue >= 1) {
      let tipAmount = (billValue * tipValue) / peopleValue;
      let totalAmount = billValue / peopleValue + tipAmount;
    
      tipOutput.innerText = `$${tipAmount.toFixed(2)}`;
      totalOutput.innerText = `$${totalAmount.toFixed(2)}`;
    }
  }


  function restValue() {
    restActiveBtn();
    inti();
    tipOutput.innerText = `$0.00`;
    totalOutput.innerText = `$0.00`;
    billInput.value = '';
    numberOfPeopleInput.value = '';
    tipInput.value = '';
    numberOfPeopleDiv.classList.remove('error');
  }