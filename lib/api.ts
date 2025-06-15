import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.196.224:3001", // change to LAN IP if using physical device
});

export default api;
