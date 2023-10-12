import axios, {Axios} from 'axios';

const instance: Axios = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "9587b767bf1151cffe9967a6ceb96fae",
        language: "ko-KR"
    }
})

export default instance;