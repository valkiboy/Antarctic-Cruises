const pageHeader = document.querySelector('.page-header');
const navToggle = document.querySelector('.main-nav__toggle');

pageHeader.classList.add('page-header--closed');

navToggle.addEventListener('click', function () {
  if (pageHeader.classList.contains('page-header--closed')) {
    pageHeader.classList.remove('page-header--closed');
    pageHeader.classList.add('page-header--open');
  } else {
    pageHeader.classList.add('page-header--closed');
    pageHeader.classList.remove('page-header--open');
  }
});

const myName = document.getElementById('name');
const myMail = document.getElementById('email');
const myPhone = document.getElementById('telephone');
const rename = /^[a-zA-Zа-яА-Я']+[a-zA-Zа-яА-Я']?$/u;
const remail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
const rephone = /([0-9]+)$/;
const bookingForm = document.querySelector('.booking__form');


const checkNameValidity = () => {

  const textName = myName.value;

  if (textName === '') {
    myName.setCustomValidity('поле обязательное');
  } else if (!rename.test(textName)) {
    myName.setCustomValidity('имя может содержать только буквы');
  } else {
    myName.setCustomValidity('');
  }
  myName.reportValidity();
};

const checkPhoneValidity = () => {
  const textPhone = myPhone.value;

  if (textPhone === '') {
    myPhone.setCustomValidity('поле обязательное');
  } else if (!rephone.test(textPhone)) {
    myPhone.setCustomValidity('номер телефона должен содержать только цифры');
  } else {
    myPhone.setCustomValidity('');
  }
  myPhone.reportValidity();
};

const checkMailValidity = () => {
  const textMail = myMail.value;

  if (textMail === '') {
    myMail.setCustomValidity('поле обязательное');
  } else if (!remail.test(textMail)) {
    myMail.setCustomValidity('адрес почты должен выглядеть так "имя_пользователя@имя_сервера"');
  } else {
    myMail.setCustomValidity('');
  }
  myMail.reportValidity();
};


myName.addEventListener('input', checkNameValidity);
myPhone.addEventListener('input', checkPhoneValidity);
myMail.addEventListener('input', checkMailValidity);


const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetch(
      'https://echo.htmlacademy.ru/',
      {
        method: 'POST',
        body: formData,
      }
  );
  evt.target.reset();
};

bookingForm.addEventListener('submit', handleFormSubmit);

function persist(event) {
  let thisArg = event.path[0];
  localStorage.setItem(thisArg.id, thisArg.value);
}

document.querySelectorAll('input').forEach((inputEl) => {
  inputEl.value = localStorage.getItem(inputEl.id);
  inputEl.addEventListener('change', persist);
});
