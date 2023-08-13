import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({ name:'', about:'' });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    //Загрузка данных профиля и галерии карточек с сервера при открытии сайта
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then (([infoUser, cards]) => {
      //профиль
      setCurrentUser(infoUser);
      //отрисовка карточек
      setCards(cards);
    })
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    });
  },[]);

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

  function handleUpdateUser(data) {
    api.setUserInfo(data)
    .then((result) => {
      console.log("внутри обработчика обновления данных профиля");
      setCurrentUser(result);
      closeAllPopups();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.setUserAvatar({avatar})
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(cardId) {
    api.deleteMyCard(cardId)
    .then(() => {
      setCards(cards.filter((c) => c._id !== cardId));
      //closeAllPopups();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((newCard) =>{
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      
      <ImagePopup
        card={selectedCard} name="image"  onClose={closeAllPopups}
      />
      
      <PopupWithForm 
        title="Вы уверены?" name="popup_delete" buttonName="Да"
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
