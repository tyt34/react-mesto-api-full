import React from 'react'
import Main from './Main'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
//import profileImg from '../images/load.gif' // переменная должна быть в camelCase
import profileImg from '../images/logo.png'
import CurrentUserContext from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'


function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Загрузка...',
    about: 'Загрузка...',
    avatar: profileImg
  })

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)

  const [cards, setCards] = React.useState([])

  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    img:  '',
  })

  React.useEffect(() => { /* new */
      const closeByEscape = (e) => {
        if (e.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', closeByEscape)

      return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  React.useEffect( () => {
    Promise.all([
      api.getCardsFromServer(), // only test
      api.getUserInfo() // only test
    ])
    .then( ([initialCards, userData]) => {
      setCards(initialCards.data) // only test
      setCurrentUser(userData.data) // only test
    })
    .catch(
      (err) => {
        console.log('1 Ошибка ===> ', err)
      }
    )
  }, [])

  function handleCardLikeDislike(card) {
    const isLiked = card.likes.some( (i) => {
      return i === currentUser._id
    })
    let method
    if (isLiked) {
      method = "DELETE"
    } else {
      method = 'PUT'
    }
    api.changeLikeCardStatus(card.id, method).then( (newCard) => {
      setCards( (cards) => cards.map( (c) => c._id === card.id ? newCard : c))
    }).catch(
      (err) => {
        console.log('3 Ошибка ===> ', err)
      }
    )
  }

  function handleCardDelete(card) {
    api.delCard(card.id).then( (newCard) => {
      const newArrCards = cards.filter( c => c._id !== card.id )
      setCards(newArrCards)
    }).catch(
      (err) => {
        console.log('5 Ошибка ===> ', err)
      }
    )
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(props) {
    setSelectedCard({
      name: props.name,
      img: props.img,
    })
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)

    setSelectedCard({
      name: '',
      img: '',
    })
  }

  function handleAddPlaceSubmit(e) {
    api.loadNewCard({
      name: e.place,
      link: e.linkPlace
    }).then( (res) => {
      setCards( [res.data, ...cards] )
      closeAllPopups()
    }).catch(
      (err) => {
        console.log('6 Ошибка ===> ', err)
      }
    )
  }

  function handleUpdaterUser(e) {
    api.loadProfile(e).then( (res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch(
      (err) => {
        console.log('7 Ошибка ===> ', err)
      }
    )
  }

  function handleUpdateAvatar(e) {
    api.changeAvatar(e).then( (res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch(
      (err) => {
        console.log('8 Ошибка ===> ', err)
      }
    )
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Main
        cards={cards}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLikeDislike}
        onCardDelete={handleCardDelete}
      />

      <EditAvatarPopup
        onUpdateAvarar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <EditProfilePopup
        onUpdateUser={handleUpdaterUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        onAddNewPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  )
}

export default App
