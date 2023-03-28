import { MediaCard } from "./MediaCard";
import video from '../assets/videoTest.mp4'
import axios from "axios";
import { useEffect, useState } from "react";
import { Media } from "../interfaces";

export const basePath="http://localhost:801/"

export const MediaList = () => {

    const [dataMedia, setDataMedia] = useState<Media[]>([]);
    
    const getMediaData=async() => {
      const response = await axios.get('http://localhost:801/Sgc/Media')
      const result = response.data
      setDataMedia(result)
      console.log(result)
    }

    useEffect(() => {
        getMediaData()
    }, []);
    
  return <div className="grid gap-2  place-items-center max-w-7xl grid-cols-1 md:grid-cols-2  w-5/6">
    {dataMedia.map(media=>(
        <MediaCard key={media.idImagenVideo} media={media}/>
    ))}
  </div>;
};
