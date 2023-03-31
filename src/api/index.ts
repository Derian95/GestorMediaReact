import axios from "axios"

const BASE_PATH="http://localhost:3005/apiGestor/"


export const getDataMedia=async() => {
  
    const response = await axios.get(BASE_PATH+"Sgc/media")
    return response.data

}

export const getDataMediaTest=async(url:string) => {
  
    const response = await axios.get(url)
    return response.data

}