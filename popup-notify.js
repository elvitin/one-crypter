'use-strict';
const notificationType = {
  success: 0,
  error: 1,
  warning: 2,
  info: 3
};

const $ = document;
const header = $.querySelector('header');

function sendPopUpNotify(
  message = 'Nenhuma mensagem definida.',
  type = notificationType.warning,
  durationMs = 1500
) {
  //
  let imgPath = '';

  switch (type) {
    //
    case notificationType.info:
      imgPath = './assets/icons/info-icon.svg';
      break;

    case notificationType.success:
      imgPath = './assets/icons/success-icon.svg';
      break;

    case notificationType.warning:
      imgPath = './assets/icons/warning_shield.svg';
      break;

    case notificationType.error:
      imgPath = './assets/icons/warning_shield.svg';
      break;
  }

  const htmlTemplate = `<img src="${imgPath}"><p>${message}</p>`;
  const notifyCard = document.createElement('div');
  notifyCard.classList.add('notify-card');
  notifyCard.innerHTML = htmlTemplate;
  let slideIn = true;

  header.appendChild(notifyCard);

  notifyCard.querySelector('img').addEventListener('load', _ => {
    //
    notifyCard.addEventListener('transitionend', _ => {
      //
      if (slideIn) {
        //
        setTimeout(_ => {
          slideIn = false;
          notifyCard.classList.remove('notify-card-slide-in');
        }, durationMs);
      } else {
        notifyCard.remove();
      }
    });

    notifyCard.classList.add('notify-card-slide-in', 'notify-card-shadow');
  });
}

export { notificationType, sendPopUpNotify };
