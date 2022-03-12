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
