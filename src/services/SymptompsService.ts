import AppAxios from "../utils/Axios"

export const findSymptomps = async (query: string) => {
    return AppAxios.get(`symptoms?name=${query}`)
}
