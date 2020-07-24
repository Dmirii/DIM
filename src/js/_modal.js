
// добавляем прототип для вставке dom элемента
Element.prototype.appendAfter= function(element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

export function dimModal(options) {
  function noop() {}
  const ANIMATION_SPEED = 200;// задержка анимации
  let closing = false; // тру в процессе закрытия окна
  let destroyed = false; // окно унечтожено
  const modal = {// возвращаем методы для обекта класса
    open() {
      if (destroyed) {
        return console.log('Modal destroyed');
      }
      !closing && $modal.classList.add('open');
    },
    close() {
      closing =true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(() => {
        $modal.classList.remove('hide');
        closing =false;
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
      }, ANIMATION_SPEED);
    },
  };
  const listener = event => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };
  // создаем модальное окно
  function _createModal(options) {
    const DEFAULT_WIDTH= '400px';
    const closeX = options.closable ? '&times;': '';
    const modal = document.createElement('div'); // создали див
    modal.classList.add('.DIMmodal'); // добавили корневой класс
    modal.insertAdjacentHTML('beforeend', `            
                <div class="DIMmodal__overlay" data-close="true">
                    <div class="DIMmodal__window" style="width: ${options.width || DEFAULT_WIDTH }">
                        <div class="DIMmodal__window-header">
                            <span class="DIMmodal__window-title">${options.title ||''}</span>
                            <span class="DIMmodal__window-close" data-close="true"> ${closeX}</span>
                        </div>
                        <div class="DIMmodal__window-body" data-content>
                        ${options.content || ''}
                        </div>
                        
                    </div>
                </div>           
            `);
    // <div class="DIMmodal__window-footer">
    //                 <button>OK</button> <button>Cancel</button>
    //             </div>
    const footer =_createModalFooter(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'));
    document.body.appendChild(modal); // добавляем созданый элемент в DOM
    return modal;
  }// end _createModal

  // отдельно создаем футер
  function _createModalFooter(buttons =[]) {
    if (buttons.lenth ===0) {
      return document.createElement('div');
    }
    const wrap = document.createElement('div');
    wrap.classList.add('DIMmodal__window-footer');
    buttons.forEach(btn => {
      const $btn = document.createElement('button');
      $btn.textContent = btn.text;
      $btn.onclick = btn.handler|| noop;
      wrap.appendChild($btn);
    });

    return wrap;
  }// end _crateModalFooter

  const $modal = _createModal(options); // создаем экземпляр
  $modal.addEventListener('click', listener);// добавляем слушателя

  return Object.assign(modal, {// используем замыкание
    destroy() {// добавляем метод дистрой
      $modal.parentNode.removeChild($modal); // удаление элемента из дом дерева
      $modal.removeEventListener('click', listener);
      destroyed =true;
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    },
  });
}
