import logo from '../images/logo.svg'
//import logo from '../images/logo.png'

function Header(props) {

  function ShowEm(prop) {
    if (prop.email) {
      return (
        <>
        <p className="header__email">{props.email}</p>
        <button className="header__close" onClick={props.onSignOut}>Выйти</button>
        </>
      )
    } else {
      return <> </>
    }
  }

  return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип сайта" />
        <a className="header__title" href={props.link}>{props.title}</a>
        <ShowEm email={props.email}/>
      </header>
  )
}

export default Header;
