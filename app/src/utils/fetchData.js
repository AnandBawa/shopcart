import axios from "axios";

const fetchData = axios.create({
  baseURL: "/api/v1",
});

export default fetchData;
