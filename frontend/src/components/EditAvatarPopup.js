import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvarar({
      link: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={'avatar'}
      isOpen={ props.isOpen }
      textTitle={`Обновить аватар`}
      textButton={`Сохранить`}
      onClose={ props.onClose }
    >
      <input
        ref={avatarRef}
        id="popup-avatar-link"
        className="popup__input"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="popup-avatar-link-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
