export const isVideo = (url: string) => {
    return (
        url.endsWith('.mp4') ||
        url.endsWith('.avi') ||
        url.endsWith('.mov') ||
        url.includes('youtube.com')
    )
}



export const capitalize=(str:string)=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
export const  getItemStorage=() => {
    const tiempo =localStorage.getItem("tiempo")
    if(tiempo){
        return tiempo
    } 
    else{
        return 5000
    }
}