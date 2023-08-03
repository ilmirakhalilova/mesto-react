function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }  

  return (
    <li className="elements__element">
      <button className="elements__delete" type="button" aria-label="Удалить"></button>
      <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="elements__caption">
        <h2 className="elements__name">{props.card.name}</h2>
        <div className="elements__grouplike">
          <button type="button" className="elements__like" aria-label="Нравится"></button>
          <p className="elements__countlikes">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;