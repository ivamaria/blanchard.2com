const edition__btn = document.querySelector('.edition__btn');
const edition__label = document.querySelectorAll('.edition__label');

edition__btn.addEventListener('click', () => {
  if (!edition__btn.classList.contains('edition__btn-active')) {
    edition__label.forEach(el => {
      el.classList.add('edition__label-active');
    });
    
    edition__btn.classList.add('edition__btn-active');
  } else {
    edition__label.forEach(el => {
      el.classList.remove('edition__label-active');
      if (el.querySelector('input').checked) {
        el.classList.add('edition__label-active');
      }
    });
    
    edition__btn.classList.remove('edition__btn-active');
  }

});
