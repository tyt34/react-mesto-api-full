import React from 'react'

function ImagePopup({card, onClose}) {
  function createAltImg(specialWord) {
    return 'Изображение места: "'+specialWord+'"'
  }

  return (
    <div id="popup-img" className={ card.name ? 'popup-img popup popup_open' : 'popup-img popup'}>
      <div className="popup-img__container">
        <img className="popup-img__img" alt={createAltImg(card.name)} src={card.img} />
        <p className="popup-img__title">{card.name}</p>
        <button id="popup-img__close" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup
