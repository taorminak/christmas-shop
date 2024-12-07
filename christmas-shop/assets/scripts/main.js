document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', function () {
      burgerMenu.classList.toggle('active');
      navLinks.classList.toggle('active');

      const isExpanded = burgerMenu.classList.contains('active');
      burgerMenu.setAttribute('aria-expanded', isExpanded);
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.header-container')) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        burgerMenu.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop && window.location.href.includes('gifts.html')) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
});
