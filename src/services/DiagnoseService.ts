import AppAxios from "../utils/Axios"

export const getDiagnoses = () => {
    return AppAxios.get(`diagnoses`)
}

export const createDiagnosis = (symptoms: Array<number>) => {
    return AppAxios.post(`diagnoses`, { symptoms })
}