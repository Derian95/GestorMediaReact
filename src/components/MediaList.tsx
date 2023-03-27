import { MediaCard } from "./MediaCard";
import video from '../assets/videoTest.mp4'
import axios from "axios";
import { useEffect, useState } from "react";
import { Media } from "../interfaces";



export const MediaList = () => {

    const [dataMedia, setDataMedia] = useState<Media[]>([]);
    
    const getMediaData=async() => {
      const response = await axios.get('http://localhost:145/sgc/media')
      const result = response.data
      setDataMedia(result)
      console.log(result)
    }

    useEffect(() => {
        getMediaData()
    }, []);
    
    const slides = [
        {
            id:1,
            url: video,
            title: 'Título 1',
            description: 'Descripción 1',
        },
        {
            id:2,
            url: video,
            title: 'Título 1',
            description: 'Descripción 1',
        },
        {

            id:3,
            url: 'https://es.web.img3.acsta.net/newsv7/22/10/04/17/04/1095824.jpg',
            title: 'Título 2',
            description: 'Descripción 2',
        },
        {
            id:4,
            url: 'https://es.web.img3.acsta.net/newsv7/22/10/04/17/04/1095824.jpg',
            title: 'Título 3',
            description: 'Descripción 3',
        },
    ]
  return <div className="grid gap-2  place-items-center max-w-7xl grid-cols-1 md:grid-cols-2  w-5/6">
    {slides.map(media=>(
        <MediaCard key={media.id} media={media}/>
    ))}
  </div>;
};
