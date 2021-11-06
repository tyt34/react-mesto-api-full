import React from 'react'

function Login(props) {
  const [login, setLogin] = React.useState('')
  const [pass, setPass] = React.useState('')

  function handleChangeLogin(e) {
    setLogin(e.target.value)
  }

  function handleChangePass(e) {
    setPass(e.target.value)
  }

  function handleLoginClick(e) {
    e.preventDefault()
    props.onLoginClick({
      identifier: login,
      password: pass,
    })
  }

  return (
    <div className="enter__container">
      <h1 className="enter__title">Вход</h1>
      <form
        className="enter__form"
        action="index.html"
        method="post"
        name="login"
        onSubmit={handleLoginClick}
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
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login;
