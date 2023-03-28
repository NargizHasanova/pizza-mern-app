import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://localhost:5000"
})

// Axios.interceptors.request.use((config) => {
//     config.headers.Authorization = window.localStorage.getItem('token')
//     // nastroy headers.Authorization = token ve bakende otur
//     return config
// })
Axios.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('user')}`;
    }
    // parse ona gore edirikki tokeni goture bilek icinnen .token, cunki bizde localstoragede user objectidi,tokende onun propertisidi

    return req;
});

export { Axios }