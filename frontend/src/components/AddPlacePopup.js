import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('')
  const [linkPlace, setLinkPlace] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddNewPlace({
      place,
      linkPlace
    })
    setPlace('')
    setLinkPlace('')
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLinkPlace(e) {
    setLinkPlace(e.target.value)
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={'add'}
      isOpen={props.isOpen}
      textTitle={`Новое место`}
      textButton={`Создать`}
      onClose={props.onClose}
    >
      <input
        value={place}
        onChange={handleChangePlace}
        id="popup-add-title"
        className="popup__input"
        name="name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="popup-add-title-error" className="popup__error"></span>
      <input
        value={linkPlace}
        onChange={handleChangeLinkPlace}
        id="popup-add-link"
        className="popup__input"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="popup-add-link-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
