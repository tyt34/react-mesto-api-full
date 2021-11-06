import React from 'react'

function Register(props) {
  const [login, setLogin] = React.useState('')
  const [pass, setPass] = React.useState('')

  function handleRegClick(e) {
    e.preventDefault()
    props.onRegClick({
      identifier: login,
      password: pass,
    })
  }

  function handleChangeLogin(e) {
    setLogin(e.target.value)
  }

  function handleChangePass(e) {
    setPass(e.target.value)
  }


  return (
    <div className="enter__container">

      <h1 className="enter__title">Регистрация</h1>
      <form
        className="enter__form"
        action="index.html"
        method="post"
        name="reg"
        onSubmit={handleRegClick}
      >
        <input
          value={login}
          onChange={handleChangeLogin}
          className="enter__input"
          name="name"
          type="text"
          placeholder="Email"
          required
        />
        <input
          value={pass}
          onChange={handleChangePass}
          className="enter__input"
          name="about"
          type="password"
          placeholder="Пароль"
          required
        />
        <button
          className="enter__save"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className='enter__field'>
        <h2 className="enter__subtitle">
          Уже зарегистрированы?
        </h2>
        <a className="enter__link" href='/sign-in'>
          Войти
        </a>
      </div>

    </div>
  )
}

export default Register;
