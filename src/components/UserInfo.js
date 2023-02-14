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
    setUserInfo(info) {
        this._nameProfile.textContent = info.name;
        this._discriptionProfile.textContent = info.about;
        this._avatarProfile.src = info.avatar
        this._id = info._id
        //console.log(this._id)
    }


    returnMyId() {
        return this._id 
        //console.log(this._id)
    }
    
}    
