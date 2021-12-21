import axios from 'axios';
import qs from 'query-string';

const final_base = "https://0d76-2001-ee0-41a1-7427-6d0b-2e3d-5e4b-ebe5.ngrok.io";

const userApi = {
    login: async (data) => {
        const url = `${final_base}/user/login`
        const response = await axios.post(url, data);
        return response.data;
    },
    getUserInfo: async (data) => {
        
        const response = await axios({
            url: `${final_base}/user`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    getListLocation: async (data) => {
        const response = await axios({
            url: `${final_base}/user/account`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    register: async (data) => {

        const response = await axios({
            url: `${final_base}/user/register`,
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${data?.access_token}`,
                "Content-Type": "application/json"
            },
            data: data?.data
        })
        return response.data;
    },
    getListAccount: async (data) => {
        const response = await axios({
            url: `${final_base}/user/account`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    changeAccountState: async (data) => {
        const response = await axios({
            url: `${final_base}/user/disable`,
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            data: data.data
        })
        return response.data;
    },
    changeListAccountState: async (data) => {
        console.log("api: ", data);
        const response = await axios({
            url: `${final_base}/user/disable/list/${data.enable}`,
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            data: data.usernames
        })
        return response.data;
    },
    changeAccountPassword: async (data) => {
        const response = await axios({
            url: `${final_base}/user/edit`,
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            data: data.data
        })
        return response.data;
    },
    changeTimeAccount: async (data) => {
        const response = await axios({
            url: `${final_base}/declarationtime/save`,
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            data: data.data
        })
        return response.data;
    },
    changeTimeListAccount: async (data) => {
        const response = await axios({
            url: `${final_base}/declarationtime/save/list`,
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            data: data.data
        })
        return response.data;
    },
    getListProvinceVn: async (data) => {
        const response = await axios({
            url: `${final_base}/location/city`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    getListDistrictByProvince: async (data) => {
        const response = await axios({
            url: `${final_base}/user/account`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    getListWardByDistrict: async (data) => {
        const response = await axios({
            url: `${final_base}/user/account`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    getListHamletByWard: async (data) => {
        const response = await axios({
            url: `${final_base}/user/account`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    }
}

export default userApi;