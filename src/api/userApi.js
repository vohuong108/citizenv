import axios from 'axios';
import qs from 'query-string';

const final_base = "http://localhost:8888/api";

const userApi = {
    login: async (data) => {
        const url = `${final_base}/login`
        const response = await axios.post(url, data);
        return response.data;
    }
}

export default userApi;