import axios from 'axios';

// قسمت دوم در axios.post :
// آن اطلاعاتی است که میخواهیم برای سرور بفرستیم
export const fetchToken = async (username, password) => {
    return axios.post('http://localhost:3001/login' , {
        username,
        password
    }).then( response => response.data) // اطلاعاتی که از سمت سرور میایند داخل  data قرار میگیرند
}

// برای نشان دادن اطلاعات کاربر
export const fetchCurrentUserInfo = (token) => {
    return axios.get('http://localhost:3001/users/me', {
        headers: {
            authorization: token  // اطلاعات داخل server فایل
        }
    }).then( response => response.data)
}
