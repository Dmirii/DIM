'use strict';
import './scss/index.scss';
import {dimModal} from './js/_modal';
import {dimConfirm} from './js/_confirm';

const modalOpen = document.querySelector('.modal-open');
const addContent = document.querySelector('.add-content');
const modalContent = document.querySelector('.modal-content');
const modalConfirmOpen = document.querySelector('.modal-confirm-open');

const modal = dimModal({
  title: 'Это модальное окно',
  closable: true,
  content: `
    <h3> Этот текст может быть изменён</h3>
    <p> введите ткст в соотвесвующей форме</p>
    <p> html теги поддерживаются</p>
    `,
  width: '580px',
  footerButtons: [
    {
      text: 'OK',
      type: 'primary', handler() {
        console.log('Primary clicked');
        modal.close();
      },
    },
    {
      text: 'Cancel',
      type: 'danger', handler() {
        console.log('Danger clicked');
        modal.close();
      },
    },
  ],
});

modalConfirmOpen.addEventListener('click', event =>{
  dimConfirm({
    title: 'Подтвердить закрытие окна?',
    content: 'обработчик выведет результат в консоль.',
  }).then( () => {
    console.log('resolve');
  }).catch( () => {
    console.log('Catch reject');
  });
});


modalOpen.addEventListener('click', event =>{
  modal.open();
});
addContent.addEventListener('click', event =>{
  modal.setContent(modalContent.value);
});


