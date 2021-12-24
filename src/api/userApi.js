import axios from 'axios';
import qs from 'query-string';

const final_base = "https://892b-2001-ee0-41a1-7427-902d-5596-3a59-6129.ngrok.io";

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
            url: `${final_base}/location/district/${data.cityId}`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    getListDistrictByManyProvince: async (data) => {
        const response = await axios({
            url: `${final_base}/location/district`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            params: data.params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
        return response.data;
    },
    getListWardByDistrict: async (data) => {
        const response = await axios({
            url: `${final_base}/location/ward/${data.districtId}`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    getListWardByManyDistrict: async (data) => {
        const response = await axios({
            url: `${final_base}/location/ward`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            params: data.params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
        return response.data;
    },
    getListHamletByWard: async (data) => {
        const response = await axios({
            url: `${final_base}/location/village/${data.wardId}`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    getListHamletByManyWard: async (data) => {
        const response = await axios({
            url: `${final_base}/location/village`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            params: data.params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
        return response.data;
    },
    declare: async (data) => {
        const response = await axios({
            url: `${final_base}/people/save`,
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            data: data.data
        })
        return response.data;
    },
    editPersonInfo: async (data) => {
        const response = await axios({
            url: `${final_base}/people/edit`,
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            data: data.data
        })
        return response.data;
    },
    getListPopulation: async (data) => {
        const response = await axios({
            url: `${final_base}/people/location`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            params: data.params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
        
        return response.data;
    },
    viewPersonalInfo: async (data) => {
        const response = await axios({
            url: `${final_base}/people/${data.id}`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    deletePersonalInfo: async (data) => {
        const response = await axios({
            url: `${final_base}/people/${data.id}`,
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        return response.data;
    },
    getAnalysisData: async (data) => {
        const response = await axios({
            url: `${final_base}/people/analysis`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            params: data.params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
        
        return response.data;
    },
    getDeclareState: async (data) => {
        const response = await axios({
            url: `${final_base}/declarationtime/state`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        
        return response.data;
    },
    changeDeclareState: async (data) => {
        const response = await axios({
            url: `${final_base}/declarationtime/complete/${data.newState}`,
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        
        return response.data;
    },
    getDeclareProgress: async (data) => {
        const response = await axios({
            url: `${final_base}/declarationtime`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
        })
        
        return response.data;
    },
    changePersonalPassword: async (data) => {
        const response = await axios({
            url: `${final_base}/user/edit/password`,
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${data.access_token}`,
                "Content-Type": "application/json"
            },
            data: data.data
        })
        
        return response.data;
    }
}

export default userApi;