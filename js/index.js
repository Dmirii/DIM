'use strict'
//import {DIM} from '../js/base.js';

const modalOpen = document.querySelector('.modal-open');
const addContent = document.querySelector('.add-content');
const modalContent = document.querySelector('.modal-content');

const modal = DIM.modal({
    title: 'My Modal window',
    closable: true,
    content: `
    <h3> Test title</h3>
    <p> lorem content</p>
    <p> lorem content</p>
    `,
    width: '580px',
    footerButtons: [
        {
            text:'OK',
            type: 'primary', handler(){
                console.log('Primary clicked');
                modal.close();
            }
        },
        {
            text:'Cancel',
            type: 'danger', handler(){
                console.log('Danger clicked');
                modal.close();
            }
        }
    ]
});


modalOpen.addEventListener('click', event =>{
    modal.open()
})
addContent.addEventListener('click', event =>{
    modal.setContent(modalContent.value)
})


