
// ----- Открывающееся меню с оверлеем -----
// -----------------------------------------

const pageHeader = document.querySelector('.page-header');
const navToggle = document.querySelector('.main-nav__toggle');
const pageBody = document.querySelector('.page-body');
const overlay = document.querySelector('.overlay');
const pageHeaderList = document.querySelector('.page-header__list');

if (typeof (pageHeader && navToggle && pageBody && overlay) !== 'undefined' && pageHeader && navToggle && pageBody && overlay !== null) {

  pageHeader.classList.add('page-header--closed');

  navToggle.addEventListener('click', function () {
    if (pageHeader.classList.contains('page-header--closed')) {
      pageHeader.classList.remove('page-header--closed');
      pageHeader.classList.add('page-header--open');
      pageBody.classList.add('menu-open');
      overlay.classList.add('overlay--open');
    } else {
      pageHeader.classList.add('page-header--closed');
      pageHeader.classList.remove('page-header--open');
      pageBody.classList.remove('menu-open');
      overlay.classList.remove('overlay--open');
    }
  });

  if (typeof (pageHeaderList) !== 'undefined' && pageHeaderList !== null) {
    const pageHeaderLinks = pageHeaderList.querySelectorAll('a');

    pageHeaderLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        pageBody.classList.remove('menu-open');
        overlay.classList.remove('overlay--open');
        pageHeader.classList.add('page-header--closed');
        pageHeader.classList.remove('page-header--open');
      });
    });
  }
}

// ----- Валидация формы при вводе данных -----
// --------------------------------------------

const myName = document.getElementById('name');
const myMail = document.getElementById('email');
const myPhone = document.getElementById('telephone');
const rename = /^[a-zA-Zа-яА-Я']+[a-zA-Zа-яА-Я']?$/u;
const remail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
const rephone = /([0-9]+)$/;
const bookingForm = document.querySelector('.booking__form');

if (typeof (myName) !== 'undefined' && myName !== null) {
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
  myName.addEventListener('input', checkNameValidity);
}

if (typeof (myPhone) !== 'undefined' && myPhone !== null) {
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
  myPhone.addEventListener('input', checkPhoneValidity);
}

if (typeof (myMail) !== 'undefined' && myMail !== null) {
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
  myMail.addEventListener('input', checkMailValidity);
}

// ----- Отправка формы -----
// --------------------------

if (typeof (bookingForm) !== 'undefined' && bookingForm !== null) {
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
}

// ----- Сохранения данных в localStorage -----
// --------------------------------------------

function persist(event) {
  let thisArg = event.path[0];
  localStorage.setItem(thisArg.id, thisArg.value);
}

document.querySelectorAll('input').forEach((inputEl) => {
  inputEl.value = localStorage.getItem(inputEl.id);
  inputEl.addEventListener('change', persist);
});
