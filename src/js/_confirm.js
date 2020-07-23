
import {dimModal} from './_modal';

export function dimConfirm(options) {
  return new Promise( (resolve, reject) =>{
    const modal = dimModal({
      title: options.title,
      width: '400px',
      content: options.content,
      closable: false,
      footerButtons: [
        {
          text: 'Отмена',
          type: 'primary', handler() {
            console.log('Primary clicked');
            modal.close();
            reject(event);
          },
        },
        {
          text: 'Удалить',
          type: 'danger', handler() {
            console.log('Danger clicked');
            modal.close();
            resolve();
          },
        },
      ],

    });
    modal.open();
  });
}
