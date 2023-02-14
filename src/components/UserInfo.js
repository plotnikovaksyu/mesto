export default class UserInfo {
    constructor(profileSelectors) {
        this._nameProfile = document.querySelector(profileSelectors.name);
        this._discriptionProfile = document.querySelector(profileSelectors.about);
        this._avatarProfile = document.querySelector(profileSelectors.avatar);
    }


    //метод возвращает объект с данными пользователя попап редактирования профиля
    getUserInfo() {
        return {
            name: this._nameProfile.textContent,
            about: this._discriptionProfile.textContent,
        }
    }


    //метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ name, about, avatar, _id }) {
        this._nameProfile.textContent = name;
        this._discriptionProfile.textContent = about;
        this._avatarProfile.src = avatar
        this._id = _id
        //console.log(this._id)
    }

    returnMyId() {
        return this._id 
        //console.log(this._id)
    }
    
}    
