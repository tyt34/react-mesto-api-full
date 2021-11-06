
function Enter(props) {
  return (
    <div className="enter__container">
      <h1 className="enter__title">{props.title}</h1>
      <form
        className="enter__form"
        action="index.html"
        method="post"
        name="persona"
      >
        <input
          id="input-profile-title"
          className="enter__input"
          name="name"
          type="text"
          value=""
          placeholder="Email"
          required
        />
        <input
          id="input-profile-subtitle"
          className="enter__input"
          name="about"
          type="text"
          value=""
          placeholder="Пароль"
          required
        />
        <button className="enter__save" type="submit">
          {props.buttonTitle}
        </button>
      </form>
      <h2 className="enter__subtitle">{props.subtitle}</h2>
    </div>
  )
}

export default Enter;
