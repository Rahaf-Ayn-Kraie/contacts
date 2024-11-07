'use strict';

class Contact {
  #name;
  #city;
  #email;

  constructor(name, city, email) {
    this.#name = Contact.capitalize(name);
    this.#city = Contact.capitalize(city);
    this.#email = email;
  }

  get name() {
    return this.#name;
  }

  get city() {
    return this.#city;
  }

  get email() {
    return this.#email;
  }

  static capitalize(str) {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  const element = select(selector);
  if (element) {
    element.addEventListener(event, callback);
  }
}

const contacts = [];
const form = select(".contact-form");
const contactList = select('.contact-list');
const countDisplay = select('.count-numbers');
const errorMessage = select('.error-message');
const nameInput = select('.name-input');
const cityInput = select('.city-input');
const emailInput = select('.email-input');

function addContact(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const city = cityInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !city || !email) {
    errorMessage.textContent = 'All fields must be filled.';
    return;
}

  if (!validateNameCity(name) || !validateNameCity(city)) {
    errorMessage.textContent = 'Please provide valid name and city.';
    return;
  } 

  if (!validateEmail(email)) {
    errorMessage.textContent = 'Please provide a valid email address.';
    return;
  }

  errorMessage.textContent = '';

  const newContact = new Contact(name, city, email);
  contacts.unshift(newContact);
  listContacts();
  form.reset();
}

function listContacts() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact-card');
    contactDiv.innerHTML = `
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>City:</strong> ${contact.city}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
    `;

    contactDiv.addEventListener('click', () => deleteContact(index));
    contactList.appendChild(contactDiv);
  });

  countDisplay.textContent = contacts.length;
}

function deleteContact(index) {
  contacts.splice(index, 1);
  listContacts();
}

function validateNameCity(input) {
  return /^[A-Za-z\s]+$/.test(input);
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

listen('submit', '.contact-form', addContact);

listen('mouseover', '.add-button', () => {
  if (nameInput.value === '') nameInput.focus();
  else if (cityInput.value === '') cityInput.focus();
  else emailInput.focus();
});
