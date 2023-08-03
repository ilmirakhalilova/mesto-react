function PopupWithForm(props) {
    return (
      <section className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <button role="button" className = "popup__close" type="button" onClick = {props.onClose} aria-label = "Закрыть"></button>
          <h3 className="popup__name">{props.title}</h3>
          <form className="popup__form" name={props.name} novalidate>
            {props.children}
            <button className="popup__submit" type="submit">Сохранить</button>
          </form>  
        </div>
      </section>
    );
  }
  
  export default PopupWithForm;

  /*<section className="popup popup_edit">
        <div className="popup__container">
          <button role="button" className="popup__close popup__close_edit" type="button" aria-label="Закрыть"></button>
          <h3 className="popup__name">Редактировать профиль</h3>
          <form className="popup__form" name="profile-form" novalidate>
            <div className="popup__form-input">
              <input id="name" name="name" className="popup__input popup__input_type_name" placeholder="Имя" minlength="2" maxlength="40" required/>
              <span id="name-error" className="popup__message"></span>
            </div>
            <div className="popup__form-input">
              <input id="about" name="about" className="popup__input popup__input_type_about" placeholder="О себе" minlength="2" maxlength="200" required/>
              <span id="about-error" className="popup__message"></span>
            </div>
            <button className="popup__submit" type="submit">Сохранить</button>
          </form>  
        </div>
      </section>*/