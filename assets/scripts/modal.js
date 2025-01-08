export class Modal {
  constructor() {
    this.createModal();
    this.bindEvents();
  }

  createModal() {
    const modalHTML = `
      <div class="modal-overlay">
        <div class="gift-card">
          <button class="modal-close"></button>
          <div class="gift-card-content">
            <div class="card-image">
              <img src="" alt="">
            </div>
            <div class="card-content">
              <span class="card-tag"></span>
              <h3 class="card-title"></h3>
              <div class="card-description"></div>
              <div class="card-superpowers"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
      existingModal.remove();
    }

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.querySelector('.modal-overlay');
    this.modalImage = this.modal.querySelector('.card-image img');
    this.modalTag = this.modal.querySelector('.card-tag');
    this.modalTitle = this.modal.querySelector('.card-title');
    this.modalDescription = this.modal.querySelector('.card-description');
    this.modalSuperpowers = this.modal.querySelector('.card-superpowers');
    this.closeButton = this.modal.querySelector('.modal-close');
  }

  bindEvents() {
    this.modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay') || 
          e.target.classList.contains('modal-close')) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  destroy() {
    this.modal.remove();
    document.body.style.overflow = '';
  }

  open(giftData) {
    this.modalImage.src = giftData.image;
    this.modalImage.alt = giftData.tag.toLowerCase();
    this.modalTag.className = `card-tag ${giftData.tagClass}`;
    this.modalTag.textContent = giftData.tag;
    this.modalTitle.textContent = giftData.title;
    this.modalDescription.textContent = giftData.description;

    const superpowers = Object.entries(giftData.superpowers).map(([key, value]) => {
      const rating = parseInt(value.replace('+', '')) / 100;
      const stars = Array(5).fill().map((_, i) => 
        `<img class="superpower-star ${i < rating ? 'active' : ''}" src="assets/images/snowflake.svg" width="16" height="16" alt="snowflake">`
      ).join('');
      
      return `<li>
        <span class="superpower-name">${key}</span>
        <div class="superpower-values">
          <span class="superpower-value">${value}</span>
          <div class="superpower-rating">${stars}</div>
        </div>
      </li>`;
    });

    this.modalSuperpowers.innerHTML = `
      <h3>ADDS SUPERPOWERS TO:</h3>
      <ul>
        ${superpowers.join('')}
      </ul>
    `;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
} 