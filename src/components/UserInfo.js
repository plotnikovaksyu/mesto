export default class UserInfo {
    constructor(profileSelectors) {
    this._nameProfile = document.querySelector(profileSelectors.name);
    this._discriptionProfile = document.querySelector(profileSelectors.discription);
    }


//метод возвращает объект с данными пользователя попап редактирования профиля
    getUserInfo() {
       return {
        name: this._nameProfile.textContent,
        discription: this._discriptionProfile.textContent
       }
       
    }

//метод принимает новые данные пользователя и добавляет их на страницу   
    setUserInfo(info) {
        this._nameProfile.textContent = info.name;
        this._discriptionProfile.textContent = info.discription;
}
    }

