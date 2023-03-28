import { FC } from "react"
import ReactPlayer from "react-player"
import { Media } from "../interfaces"
import { useMedia, useUiStore } from "../store/uiStore"
import { isVideo } from "../utils"
import { basePath } from "./MediaList"


interface Props{
   media:Media
}


export const MediaCard:FC<Props> = ({media}) => {
    const {openModal,isEditOn} = useUiStore()
    const {setStateMedia} = useMedia()
    
    const showModalEdit=() => {
      setStateMedia(media)
      openModal()
      isEditOn()
    }
   
	return (
		<div className='w-full h-72 rounded bg-gray flex'>
            {isVideo(media.location) 
            ? (
                <ReactPlayer
                url={ basePath+media.location}
                muted={true}
                controls
                width={"50%"}
                height={"100%"}
            />
            )
            :(
            <img
				className='w-2/4 h-full'
				src={basePath+media.location}
				alt=''
			/>
            )}
			
			<div className='w-2/4 h-full flex items-center justify-center flex-col'>
				<h1>{media.title}</h1>
				<p>{media.description}</p>
                {media.state? (<p>verdadero</p>):(<p>falso</p>)}
                <div>
                    <button className="bg-info p-2 rounded text-white" onClick={showModalEdit}>Editar</button>
                    <button className="bg-danger p-2 rounded text-white" >Eliminar</button>
                </div>
			</div>
		</div>
	)
}
