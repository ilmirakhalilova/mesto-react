function ImagePopup(props) {
  return (
    <div className={`popup popup_image popup_dark popup_type_${props.name} ${props.isOpen && "popup_opened"}`} >
      <div className="popup__image-container">
        <button onClick={props.onClose} role="button" className="popup__close popup__close_image" type="button" aria-label="Закрыть"></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__image-caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;