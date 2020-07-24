
import {dimModal} from './_modal';

export function dimConfirm(options) {
  return new Promise( (resolve, reject) =>{
    const modal = dimModal({
      title: options.title,
      width: '400px',
      content: options.content,
      onClose() {
        modal.destroy();
      },
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
          text: 'Принять',
          type: 'danger', handler() {
            console.log('Danger clicked');
            modal.close();
            resolve();
          },
        },
      ],

    });
    setTimeout( () => modal.open(), 1000);
  });
}
