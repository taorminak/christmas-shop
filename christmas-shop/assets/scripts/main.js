document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  if (burgerMenu && navLinks) {
    function toggleMenu(show) {
      burgerMenu.classList.toggle('active', show);
      navLinks.classList.toggle('active', show);
      document.body.classList.toggle('menu-open', show);
      burgerMenu.setAttribute('aria-expanded', show);
    }

    burgerMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      const willShow = !burgerMenu.classList.contains('active');
      toggleMenu(willShow);
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.burger-menu') && 
          !event.target.closest('.nav-links') && 
          navLinks.classList.contains('active')) {
        toggleMenu(false);
      }
    });

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        
      if (href.startsWith('#') || href.includes('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            toggleMenu(false);
            setTimeout(() => {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }
        } else if (href === window.location.pathname || 
                   href === window.location.pathname + window.location.hash) {
          e.preventDefault();
          toggleMenu(false);
        } else {
          toggleMenu(false);
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        toggleMenu(false);
      }
    });
  }

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
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
