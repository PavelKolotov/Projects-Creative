import '../css/index.css';

document.addEventListener('DOMContentLoaded', function() {
  const animItems = document.querySelectorAll('._anim-items');
  const navbar = document.querySelector('.navbar');
  const offsetTopFeatures = document.querySelector('.home__container').offsetTop;
  const links = document.querySelectorAll('.mobile-nav__link');
  const toggleMenu = document.querySelector('#toggleMenu');

  const offset = (el) => {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
  };

  const animOnScroll = () => {
    if (window.pageYOffset >= offsetTopFeatures) {
      navbar.classList.add('sticky')
    } else {
      navbar.classList.remove('sticky');
    }

    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;

      const animStart = 4;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('_active');
        }
      }
    }
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);

  window.addEventListener('scroll', animOnScroll);

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu.checked = false;
      document.body.classList.remove('open-menu');
    });
  });

  toggleMenu.addEventListener('click', () => {
    document.body.classList.toggle('open-menu');
  });
});
