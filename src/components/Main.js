import React from 'react'
import api from '../utils/Api'
import Card from './Card'

function Main(props) {

  const [userName, setUserName] = React.useState("");
  const [userDescription , setUserDescription ] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    //Загрузка данных профиля и галерии карточек с сервера при открытии сайта
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then (([infoUser, cards]) => {
        console.log(infoUser);
        setUserName(infoUser.name);
        //профиль
         setUserDescription(infoUser.about);
         setUserAvatar(infoUser.avatar);
        //отрисовка карточек
        setCards(cards);
        // cards.forEach(item => {
        //     cardList.addItems(createCard(item));
        // });
        console.log(cards);
    })
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    });
  },[]);

  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-edit-button">
          <img onClick={props.onEditAvatar} className="profile__avatar" src={userAvatar}  alt="аватар" />
        </button>
        <div className="profile__info">
          <div className="profile__naming">
            <h1 className="profile__name">{userName}</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="Добавить карточку"></button>
      </section>
      <section className="content">
        <ul className="elements">
          {cards.map((item) => (
            <Card
              card={item} key={item._id} onCardClick={props.onCardClick}
            />
          ))}
        </ul>
      </section>

      
    </main>
  );
}

export default Main;