import axios from "axios";
export default axios.create({
    baseURL: 'http://localhost:5051/',
    headers: {"skip-browser-warning": "true"}
})