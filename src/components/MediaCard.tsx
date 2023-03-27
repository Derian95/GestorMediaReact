import { FC } from "react"
import ReactPlayer from "react-player"
import { Media } from "../interfaces"
import { useMedia, useUiStore } from "../store/uiStore"
import { isVideo } from "../utils"


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
            {isVideo(media.url) 
            ? (
                <ReactPlayer
                url={media.url}
                muted={true}
                controls
                width={"50%"}
                height={"100%"}
            />
            )
            :(
            <img
				className='w-2/4 h-full'
				src={media.url}
				alt=''
			/>
            )}
			
			<div className='w-2/4 h-full flex items-center justify-center flex-col'>
				<h1>{media.title}</h1>
				<p>{media.description}</p>
                <div>
                    <button className="bg-info p-2 rounded text-white" onClick={showModalEdit}>Editar</button>
                    <button className="bg-danger p-2 rounded text-white" >Eliminar</button>
                </div>
			</div>
		</div>
	)
}
