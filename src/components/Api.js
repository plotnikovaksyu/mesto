class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    //проверка ответа сервера на ошибки
    _checkRequest(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так =( Ошибка: ${res.status}`);
    }



    //загрузка данных о пользователе
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._checkRequest);

    };



    //редактирование профиля 
    editProfilePopup({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(this._checkRequest)
    }


    //обновление аватарки
    updateAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(this._checkRequest);
    }



    //отрисовка карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this._checkRequest)
        // .then((res) => {
        //     console.log(res)
        // })
    }


    //добавление новых карточек
    addNewCard(values) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: values.place,
                link: values.img
            })
        })
            .then(this._checkRequest);
    }




    //поставить лайк
    setLike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._checkRequest);
    }

    //удалить лайк
    deleteLike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkRequest);
    }


    //удаление карточек
    deleteCard(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkRequest);

    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: '831d19d2-f73f-4dd0-b242-f33cbf2eeb23',
        'Content-Type': 'application/json'
    }
})


