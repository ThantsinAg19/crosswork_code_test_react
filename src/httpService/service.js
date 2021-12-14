import axiosInstance from ".";

export async function checkServer(){
    return axiosInstance.get('/check');
}

export async function getGenderRatio () {
    return axiosInstance.get('/pie');
}

export async function getAgeGroup () {
    return axiosInstance.get('/bar');
}

export async function getChartData () {
    return axiosInstance.get('/chart')
}

export async function createNewRecord(data) {
    return axiosInstance.post('/chart',data)
}