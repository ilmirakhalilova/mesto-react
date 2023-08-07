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
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setSelectedCard({});
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
        title="Редактировать профиль" name="popup_edit" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonName="Сохранить">
        <>
          <div className="popup__form-input">
            <input id="name" name="name" className="popup__input popup__input_type_name" placeholder="Имя" minLength="2" maxLength="40" required/>
            <span id="name-error" className="popup__message"></span>
          </div>
          <div className="popup__form-input">
            <input id="about" name="about" className="popup__input popup__input_type_about" placeholder="О себе" minLength="2" maxLength="200" required/>
            <span id="about-error" className="popup__message"></span>
          </div>
        </>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место" name="popup_add" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonName="Создать">
        <>
          <div className="popup__form-input">
            <input id="place-name" name="place-name" className="popup__input popup__input_new_place" type="text" placeholder="Название" minLength="2" maxLength="30" value="" required/>
            <span id="place-name-error" className="popup__message"></span>
          </div>
          <div className="popup__form-input">
            <input id="link-place" name="link-place" className="popup__input popup__input_link_place" type="url" placeholder="Ссылка на картинку" value="" required/>
            <span id="link-place-error" className="popup__message"></span>
          </div>
        </>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard} name="image"  onClose={closeAllPopups}
      />
      
      <PopupWithForm 
        title="Вы уверены?" name="popup_delete" buttonName="Да"
      />

      <PopupWithForm
        title="Обновить аватар" name="popup_update-avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonName="Сохранить">
        <div className="popup__form-input">
          <input id="linkavatar" name="linkavatar" className="popup__input popup__input_link_avatar" type="url" placeholder="Ссылка на картинку" value="" required/>
          <span id="linkavatar-error" className="popup__message"></span>
        </div>
      </PopupWithForm>
    </>
  );
}

export default App;
