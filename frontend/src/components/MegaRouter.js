import React from 'react'
import { Route, Switch, Redirect, useHistory} from 'react-router-dom'
import Header from './Header'
import App from './App'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import ProtectedRoute from './ProtectedRoute'
import * as auth from '../utils/Auth';


function MegaRouter() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isInfoOpen, setisInfoOpen] = React.useState(false)
  const [isTitle, setIsTitle] = React.useState('')
  const [isAlt, setIsAlt] = React.useState('Изображение информирующее, что всё плохо!')
  const [isRes, setIsRes] = React.useState(true)
  const [isEmail, setIsEmail] = React.useState('')

  const history = useHistory()

  function closePopupInfo() {
    setisInfoOpen(false)
  }

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/login');
  }

  function handleLoginClick(data) {
    auth.authorize(data)
      .then((obj) => {
        if (obj.token) {
          setIsEmail(data.identifier)
          localStorage.setItem('jwt', obj.token)
          setLoggedIn(true)
          history.push('/')
        }
      })
      .catch( err => console.log('MR-Ошибка1: ', err))
  }

  React.useEffect(() => {
    tokenCheck()
  }, [])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')

    if (jwt){
      auth.getContent(jwt)
        .then( (res) => {
          if (res.email) {
            setLoggedIn(true)
            history.push('/')
          }
        })
        .catch( err => console.log('MR-Ошибка 2: ', err))
    }
  }

  function handleRegClick(data) {
    auth.regg(data)
      .then(obj => {
        setIsRes(true)
        setIsTitle('Вы успешно зарегистрировались!')
        setIsAlt('Изображение информирующее, что всё хорошо!')
        setisInfoOpen(true)
      })
      .catch( err => {
        setIsRes(false)
        setIsTitle('Что-то пошло не так! Попробуйте ещё раз.')
        setIsAlt('Изображение информирующее, что всё плохо!')
        setisInfoOpen(true)
        console.log('MR-Ошибка 3: ', err)
      })
  }

  return (
    <div className='page'>
      <Switch>
        <Route path="/sign-in">
            <Header title='Регистрация' link='/sign-up' />
            <Login onLoginClick={handleLoginClick}/>
          </Route>
        <Route path="/sign-up">
            <Header title='Войти' link='/sign-in' />
            <Register onRegClick={handleRegClick}/>
            <InfoTooltip
              isOpen={isInfoOpen}
              title={isTitle}
              alt={isAlt}
              res={isRes}
              onClose={closePopupInfo}
            />
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={
            <>
              <Header
                email={isEmail}
                onSignOut={onSignOut}
              />
              <App />
              <Footer />
            </>
          }
        />
        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
    </div>
  )
}

export default MegaRouter
