import axiosClient from "./axiosClient"

const categoryApi = {
    getAll() {
        const url = '/categories'
        return axiosClient.get(url)
    },
    getById(id) {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
}

export default categoryApi