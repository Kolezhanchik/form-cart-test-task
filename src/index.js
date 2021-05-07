import Cart from "@Components/Cart";
import CartItem from "@Components/CartItem";
import '@/assets/styles/scss.scss';
import logo from '@/assets/images/logo.svg';
import userData from '@/assets/data/data.json';
import geoFindMe from './assets/helpers/location';
const countriesList = require('./assets/data/countries ').countries;
import FormValidator from './Components/FormValidator.js'; 
import { data } from './assets/data/formData'; 

let currentTab = 0;
showTab(currentTab);
document.querySelectorAll('.form__geobtn').forEach(item => {
  item.addEventListener('click', geoFindMe);
})
document.querySelector('.header__cart-quantity').textContent = userData.cart.length;
document.querySelector('.header__logo').src = logo;
document.querySelectorAll('.form__input_select').forEach(item =>
  item.addEventListener('click', handleSelectorClick))

document.querySelectorAll('.form__list').forEach(item => {
  addCountry(item)
  item.addEventListener('click', handleListClick)
});

function handleListClick(e) {
  const parent = e.target.closest('.form__wrap_select')
  parent.querySelector('.form__input_select').value = e.target.textContent;
  parent.querySelector('.form__list').classList.toggle('form__list_active')
  parent.classList.toggle('form__wrap_select-active')
}

function handleSelectorClick(e) {
  const parent = e.target.closest('.form__wrap_select')
  parent.querySelector('.form__list')
    .classList.toggle('form__list_active')
  parent.querySelector('.form__input_select').placeholder = '';
  parent.classList.toggle('form__wrap_select-active')
}

function addCountry(list) {
  countriesList.forEach(item => {
    const listItem = document.createElement("li");
    listItem.classList.add('form__list-item');
    listItem.textContent = item;
    list.appendChild(listItem);
  });
}

const cart = new Cart({
  renderer: (item) => {
    const cartItem = newCartItemGen(item);
    const cardItem = cartItem.generateCartItem();
    cart.addItem(cardItem);
  }
}, '.cart__items', '.cart');

cart.rendererItems(userData.cart)
cart.cartResult(userData)
function newCartItemGen(item) {
  const cartItem = new CartItem(item, '#cart-item-template');
  return cartItem;
}


const nextBtn = document.querySelector(".form__btn");
nextBtn.addEventListener('click', () => { nextPrev(1) })


function showTab(n) {
  const x = document.querySelectorAll(".form__step");
  x[n].style.display = "block";
  document.querySelector(".form__btn").setAttribute("disabled", "");
  if (n === (x.length - 1)) {
    document.querySelector(".form__btn").textContent = "Pay Securely";
  } else {
    document.querySelector(".form__btn").textContent = "Continue";
  }
  fixStepIndicator(n);
  const str = `.${x[n].classList[0]}-${n}`;
  const validation = new FormValidator(data, str);
  validation.enableValidation();
}

function nextPrev(n) {
  const x = document.querySelectorAll(".form__step");
  if (n > 2) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.querySelector(".form").submit();
    return false;
  }
  showTab(currentTab);
}


function fixStepIndicator(n) {
  const x = document.querySelectorAll(".form__crumb");
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove('form__crumb_active')
    if (i < n) x[i].classList.add('form__crumb_passed')
  }
  x[n].classList.add('form__crumb_active');
}


