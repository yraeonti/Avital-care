import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://avital-care.vercel.app/api",
    headers: {
        apikey: 'moegreene51234',

    },
});

export default class ApiClient {
    constructor(endPoint) {
        this.endPoint = endPoint
    }

    getAll = async () => {
        return axiosInstance.get(this.endPoint).then((res) => res.data)
    }
}

