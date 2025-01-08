import { Modal } from './modal.js';

let modal;

document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  if (burgerMenu && navLinks) {
    function toggleMenu(show) {
      if (show === false) {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        navLinks.style.transition = 'right 0.3s ease-in-out';
        burgerMenu.classList.remove('active');
      } else {
        burgerMenu.classList.add('active');
        navLinks.classList.add('active');
        document.body.classList.add('menu-open');
      }

      burgerMenu.setAttribute('aria-expanded', show);
    }

    burgerMenu.addEventListener('click', e => {
      e.stopPropagation();
      const willShow = !burgerMenu.classList.contains('active');
      toggleMenu(willShow);
    });

    navLinks.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const link = e.target.closest('a');

      if (link) {
        const href = link.getAttribute('href');
        if (href?.startsWith('#')) {
          toggleMenu(false);
          setTimeout(() => {
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }, 600);
        } else if (href === window.location.pathname) {
          toggleMenu(false);
        } else {
          window.location.href = href;
          toggleMenu(false);
        }
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        toggleMenu(false);
      }
    });
  }

  const slider = document.querySelector('.slider-items');
  const prevButton = document.querySelector('.slider-prev');
  const nextButton = document.querySelector('.slider-next');

  if (slider && prevButton && nextButton) {
    let currentPosition = 0;
    let maxPosition;
    let stepSize;

    function updateSliderParams() {
      const isDesktop = window.innerWidth > 768;
      const totalWidth = slider.scrollWidth;
      const containerWidth = slider.parentElement.clientWidth;
      const totalSteps = isDesktop ? 3 : 6;

      maxPosition = -(totalWidth - containerWidth);
      stepSize = Math.abs(maxPosition) / totalSteps;

      currentPosition = 0;
      slider.style.transform = `translateX(0)`;
      updateButtonStates();
    }

    function updateButtonStates() {
      const prevArrow = prevButton.querySelector('img');
      const nextArrow = nextButton.querySelector('img');

      if (currentPosition >= 0) {
        prevButton.setAttribute('disabled', 'true');
        prevButton.classList.add('inactive');
        prevButton.classList.remove('active');
        prevButton.style.backgroundColor = 'transparent';
        prevButton.style.border = '1px solid var(--static-white-40)';
        prevArrow.style.filter =
          'brightness(0) saturate(100%) invert(100%) opacity(0.4)';
      } else {
        prevButton.removeAttribute('disabled');
        prevButton.classList.remove('inactive');
        prevButton.classList.add('active');
        if (prevButton.matches(':hover')) {
          prevButton.style.backgroundColor = 'var(--static-white)';
          prevArrow.style.filter =
            'brightness(0) saturate(100%) invert(32%) sepia(96%) saturate(7152%) hue-rotate(343deg) brightness(97%) contrast(100%)';
        } else {
          prevButton.style.backgroundColor = 'transparent';
          prevArrow.style.filter = 'brightness(0) saturate(100%) invert(100%)';
        }
        prevButton.style.border = '1px solid var(--static-white)';
      }

      if (currentPosition <= maxPosition) {
        nextButton.setAttribute('disabled', 'true');
        nextButton.classList.add('inactive');
        nextButton.classList.remove('active');
        nextButton.style.backgroundColor = 'transparent';
        nextButton.style.border = '1px solid var(--static-white-40)';
        nextArrow.style.filter =
          'brightness(0) saturate(100%) invert(100%) opacity(0.4)';
      } else {
        nextButton.removeAttribute('disabled');
        nextButton.classList.remove('inactive');
        nextButton.classList.add('active');
        if (nextButton.matches(':hover')) {
          nextButton.style.backgroundColor = 'var(--static-white)';
          nextArrow.style.filter =
            'brightness(0) saturate(100%) invert(32%) sepia(96%) saturate(7152%) hue-rotate(343deg) brightness(97%) contrast(100%)';
        } else {
          nextButton.style.backgroundColor = 'transparent';
          nextArrow.style.filter = 'brightness(0) saturate(100%) invert(100%)';
        }
        nextButton.style.border = '1px solid var(--static-white)';
      }
    }

    function addButtonHoverListeners(button) {
      const arrow = button.querySelector('img');

      button.addEventListener('mouseenter', () => {
        if (!button.classList.contains('inactive')) {
          button.style.backgroundColor = 'var(--static-white)';
          button.style.border = '1px solid var(--static-white)';
          arrow.style.filter =
            'brightness(0) saturate(100%) invert(32%) sepia(96%) saturate(7152%) hue-rotate(343deg) brightness(97%) contrast(100%)';
        }
      });

      button.addEventListener('mouseleave', () => {
        if (!button.classList.contains('inactive')) {
          button.style.backgroundColor = 'transparent';
          button.style.border = '1px solid var(--static-white)';
          arrow.style.filter = 'brightness(0) saturate(100%) invert(100%)';
        }
      });
    }

    function moveSlider(direction) {
      currentPosition += stepSize * direction;
      currentPosition = Math.max(maxPosition, Math.min(0, currentPosition));
      slider.style.transform = `translateX(${currentPosition}px)`;
      updateButtonStates();
    }

    prevButton.addEventListener('click', () => {
      moveSlider(1);
    });

    nextButton.addEventListener('click', () => {
      moveSlider(-1);
    });

    addButtonHoverListeners(prevButton);
    addButtonHoverListeners(nextButton);

    const nextArrow = nextButton.querySelector('img');
    nextButton.classList.add('active');
    nextButton.style.backgroundColor = 'transparent';
    nextButton.style.border = '1px solid var(--static-white)';
    nextArrow.style.filter = 'brightness(0) saturate(100%) invert(100%)';

    prevButton.style.backgroundColor = 'transparent';
    prevButton.style.border = '1px solid var(--static-white-40)';
    updateSliderParams();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateSliderParams, 250);
    });
  }

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.innerWidth <= 768 && window.scrollY > 300) {
            backToTop.style.display = 'flex';
          } else {
            backToTop.style.display = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  function updateTimer() {
    const timerElements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds'),
    };

    if (Object.values(timerElements).every(element => element)) {
      const now = new Date();
      const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      const currentYear = utcNow.getUTCFullYear();
      const newYear = new Date(Date.UTC(currentYear + 1, 0, 1));
      const diff = newYear - utcNow;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      timerElements.days.textContent = days;
      timerElements.hours.textContent = hours;
      timerElements.minutes.textContent = minutes;
      timerElements.seconds.textContent = seconds;
    }
  }

  if (document.getElementById('days')) {
    updateTimer();
    setInterval(updateTimer, 1000);
  }

  let giftsArray = [];

  function initializeGiftCards() {
    const giftsCards = document.querySelectorAll('.gift-card');

    giftsCards.forEach(giftCard => {
      giftCard.addEventListener('click', () => {
        const giftId = giftCard.dataset.giftId;
        const giftData = giftsArray.find(item => item.id === giftId);

        if (giftData) {
          const processedGiftData = {
            id: giftData.id,
            image: `assets/images/gift-for-${giftData.category.split(' ')[1].toLowerCase()}.png`,
            tagClass: giftData.category.split(' ')[1].toLowerCase(),
            tag: giftData.category.toUpperCase(),
            title: giftData.name,
            description: giftData.description,
            superpowers: giftData.superpowers,
          };
          modal = new Modal();

          modal.open(processedGiftData);
        }
      });
    });
  }

  function loadGiftCards() {
    function createGiftCardHTML(card) {
      return `
        <div class="gift-card ${card.tagClass}" data-gift-id="${card.id}">
          <div class="card-image">
            <img src="${card.image}" alt="${card.tag.toLowerCase()}">
          </div>
          <div class="card-content">
            <span class="card-tag ${card.tagClass}">${card.tag}</span>
            <h3 class="card-title">${card.title}</h3>
          </div>
        </div>
      `;
    }

    fetch('assets/data/gifts.json')
      .then(response => response.json())
      .then(data => {
        giftsArray = data.map(gift => ({
          id: gift.id,
          name: gift.name,
          category: gift.category,
          description: gift.description,
          superpowers: gift.superpowers,
          image: `assets/images/gift-for-${gift.category.split(' ')[1].toLowerCase()}.png`,
          tagClass: gift.category.split(' ')[1].toLowerCase(),
          tag: gift.category.toUpperCase(),
        }));

        const bestGiftsContainer = document.querySelector('.gift-cards');
        if (bestGiftsContainer) {
          const shuffledCards = [...data]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map(card => ({
              id: card.id,
              image: `assets/images/gift-for-${card.category.split(' ')[1].toLowerCase()}.png`,
              tagClass: card.category.split(' ')[1].toLowerCase(),
              tag: card.category.toUpperCase(),
              title: card.name,
            }));

          bestGiftsContainer.innerHTML = shuffledCards
            .map(createGiftCardHTML)
            .join('');

          initializeGiftCards();
        }

        const giftsContainer = document.querySelector(
          '.gifts .gift-cards, .gifts, main .gift-cards'
        );
        const filterTabs = document.querySelector('.filter-tabs, .filters');

        if (giftsContainer && filterTabs) {
          const categories = [
            { id: 'all', name: 'ALL' },
            { id: 'work', name: 'FOR WORK' },
            { id: 'health', name: 'FOR HEALTH' },
            { id: 'harmony', name: 'FOR HARMONY' },
          ];

          filterTabs.innerHTML = categories
            .map(
              category => `
              <button class="filter-tab ${category.id === 'all' ? 'active' : ''}" 
                      data-category="${category.id}">
                ${category.name}
              </button>
            `
            )
            .join('');

          const processedCards = data.map(card => ({
            id: card.id,
            image: `assets/images/gift-for-${card.category.split(' ')[1].toLowerCase()}.png`,
            tagClass: card.category.split(' ')[1].toLowerCase(),
            tag: card.category.toUpperCase(),
            title: card.name,
          }));

          function renderCards(cards) {
            giftsContainer.innerHTML = cards.map(createGiftCardHTML).join('');

            initializeGiftCards();
          }

          renderCards(processedCards);

          filterTabs.addEventListener('click', e => {
            if (e.target.classList.contains('filter-tab')) {
              e.preventDefault();
              e.stopPropagation();

              const category = e.target.dataset.category;

              filterTabs.querySelectorAll('.filter-tab').forEach(tab => {
                tab.classList.toggle('active', tab === e.target);
              });

              const filteredCards =
                category === 'all'
                  ? processedCards
                  : processedCards.filter(card => card.tagClass === category);

              renderCards(filteredCards);
            }
          });
        }

        window.addEventListener('popstate', () => {
          modal?.destroy();
        });

        document.addEventListener('click', e => {
          const link = e.target.closest('a');
          const card = e.target.closest('.gift-card');

          if (link && link.href && !card) {
            e.preventDefault();
            modal?.destroy();
            window.location.href = link.href;
          }
        });

        window.addEventListener('load', () => {
          if (modal && !window.location.href.includes('gifts')) {
            modal.destroy();
          }
        });
      })
      .catch(error => {
        console.error('Error loading gift cards:', error);
      });
  }

  loadGiftCards();
});
