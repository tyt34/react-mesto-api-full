import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {

  const currenUser = React.useContext(CurrentUserContext);

  function createAltImg(specialWord) {
    return 'Изображение места: "' + specialWord + '"';
  }

  function handleClick() {
    props.onCardClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props)
  }
  const isOwn = props.isOwn === currenUser._id;
  const cardDeleteButtonClassName = `${isOwn ? "place__del" : "nothing"}`;

  const isLiked = props.likes.some((i) => {
    return i === currenUser._id
  });

  const cardLikeButtonClassName = `${
    isLiked ? "place__like place-like" : "place__like"
  }`;

  return (
    <article className="place">
      <img
        className="place__img"
        src={props.img}
        onClick={handleClick}
        alt={createAltImg(props.name)}
      />
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
      ></button>
      <div className="place__option">
        <h2 className="place__title">{props.name}</h2>
        <div className="place__like-container">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <p className="place__num">{props.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
