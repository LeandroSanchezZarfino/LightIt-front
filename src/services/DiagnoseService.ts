import AppAxios from "../utils/Axios"

export const getDiagnoses = (page: number = 1) => {
    return AppAxios.get(`diagnoses?page=${page}`)
}

export const createDiagnosis = (symptoms: Array<number>) => {
    return AppAxios.post(`diagnoses`, { symptoms })
}

export const validateDiagnosis = (diagnosisId: number, correct: boolean) => {
    return AppAxios.put(`diagnoses/${diagnosisId}`, { correct })
}