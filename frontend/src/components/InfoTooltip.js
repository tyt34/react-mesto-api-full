import React from "react";
import on from '../images/enter_on.svg'
import off from '../images/enter_off.svg'

function InfoTooltip(props) {

  return (
    <div
      className={props.isOpen ? "popup popup_open" : "popup"}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img className="popup__img" src={props.res ? on : off} alt={props.alt} />
        <p className="popup__subtitle">{props.title}</p>
      </div>
    </div>
  )
}

export default InfoTooltip
