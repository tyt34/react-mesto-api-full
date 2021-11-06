import React from "react";

function PopupWithForm(props) {
  return (
    <div
      id={`popup-${props.name}`}
      className={props.isOpen ? "popup popup_open" : "popup"}
    >
      <div className={`popup-${props.name}__container popup__container`}>
        <button
          id={`popup-${props.name}__close`}
          onClick={props.onClose}
          className="popup__close"
          type="button"
        ></button>
        <p className={`popup-${props.name}__title`}>{`${props.textTitle}`}</p>
        <form
          onSubmit={props.onSubmit}
          name={`${props.name}`}
          className={`popup-${props.name}__form popup__form`}
        >
          {props.children}
          <button
            id={`popup-${props.name}__save`}
            className={`popup__save`}
            type="submit"
          >
            {`${props.textButton}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
