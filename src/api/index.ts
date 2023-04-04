import axios from "axios"


const mediaApi = axios.create({
  baseURL:"http://localhost:3005/apiGestor/"
})

const BASE_PATH="http://localhost:3005/apiGestor/"


export const mediaList= "Sgc/media"
export const updateState= "Sgc/updateStateMedia"

export const getDataMedia=async() => {
  
    const response = await mediaApi.get(mediaList)
    return response.data

}

export const postChangeState=async(id:number) => {
  
  const response = await mediaApi.post(updateState+`?idMedia=${id}`)
  return response.data

}

export const getDataMediaTest=async(url:string) => {
  
    const response = await axios.get(url)
    return response.data

}


export const deleteMedia=async(id:number) => {
  try {
    const response = await axios.delete(BASE_PATH+`Sgc/deleteMedia?idMedia=${id}`)
    console.log(response.data)
  } catch (error) {
    console.log(error)
    
  }

}