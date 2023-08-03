import React from 'react'
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false)

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true); 
  }
  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }

  return (
    <>
      <Header />
      <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        title="Редактировать профиль" name="popup_edit" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
        children={
          <>
            <div className="popup__form-input">
              <input id="name" name="name" className="popup__input popup__input_type_name" placeholder="Имя" minlength="2" maxlength="40" required/>
              <span id="name-error" className="popup__message"></span>
            </div>
            <div className="popup__form-input">
              <input id="about" name="about" className="popup__input popup__input_type_about" placeholder="О себе" minlength="2" maxlength="200" required/>
              <span id="about-error" className="popup__message"></span>
            </div>
          </>
        }
      />

      <PopupWithForm
        title="Новое место" name="popup_add" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
        children={
          <>
            <div className="popup__form-input">
              <input id="place-name" name="place-name" className="popup__input popup__input_new_place" type="text" placeholder="Название" minlength="2" maxlength="30" value="" required/>
              <span id="place-name-error" className="popup__message"></span>
            </div>
            <div className="popup__form-input">
              <input id="link-place" name="link-place" className="popup__input popup__input_link_place" type="url" placeholder="Ссылка на картинку" value="" required/>
              <span id="link-place-error" className="popup__message"></span>
            </div>
          </>
        }
      />

      <ImagePopup
        card={selectedCard} name="image" isOpen={imagePopupOpen} onClose={closeAllPopups}
      />
      
      {/* <section className="popup popup_delete">
        <div className="popup__container">
          <button role="button" className="popup__close popup__close_edit" type="button" aria-label="Закрыть"></button>
          <h3 className="popup__name">Вы уверены?</h3>
          <form className="popup__form" name="profile-form" novalidate>
            <button className="popup__submit" type="submit">Да</button>
          </form>  
        </div>
      </section> */}
      <PopupWithForm 
        title="Вы уверены?" name="popup_delete"
      />

      <PopupWithForm
        title="Обновить аватар" name="popup_update-avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
        children={
          <div className="popup__form-input">
            <input id="linkavatar" name="linkavatar" className="popup__input popup__input_link_avatar" type="url" placeholder="Ссылка на картинку" value="" required/>
            <span id="linkavatar-error" className="popup__message"></span>
          </div>
        }
      />
    </>
  );
}

export default App;
