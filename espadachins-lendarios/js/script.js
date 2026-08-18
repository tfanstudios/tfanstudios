const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');
const modal = document.querySelector('.image-modal');
const modalImage = modal.querySelector('img');

menuButton.addEventListener('click', () => {
  const opened = navigation.classList.toggle('open');
  menuButton.classList.toggle('open', opened);
  menuButton.setAttribute('aria-expanded', String(opened));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  modalImage.src = '';
}

document.querySelectorAll('.gallery-button').forEach((button) => {
  button.addEventListener('click', () => {
    modalImage.src = button.dataset.image;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
  });
});

modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });
document.getElementById('current-year').textContent = new Date().getFullYear();
