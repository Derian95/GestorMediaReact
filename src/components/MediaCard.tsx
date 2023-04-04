import {FC} from 'react'
import ReactPlayer from 'react-player'
import {Media} from '../interfaces'
import {useMedia, useUiStore} from '../store/uiStore'
import {isVideo} from '../utils'
import {basePath} from './MediaList'
import {deleteMedia, mediaList, postChangeState} from '../api'
import {mutate} from 'swr'
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline'
import { SwitchMeda } from './SwitchMeda'
import Swal from 'sweetalert2'
interface Props {
	media: Media
}

export const MediaCard: FC<Props> = ({media}) => {
	const {openModal, isEditOn} = useUiStore()
	const {setStateMedia} = useMedia()

	const showModalEdit = () => {
		setStateMedia(media)
		openModal()
		isEditOn()
	}
	const deleteMediaAction = (idMedia: number) => {
		Swal.fire({
			title: '¿Seguro de eliminar esta publicidad?',
			text: "No podra revertir esta acción",
  			icon: 'warning',
			  showCancelButton: true,
			  cancelButtonText:'No',
			  confirmButtonColor: 'rgb(32, 101, 209)',
			  cancelButtonColor: 'rgb(183, 29, 24)',
			  confirmButtonText: 'Si'
		  }).then((result) => {
			if (result.isConfirmed) {
				deleteMedia(idMedia)
				Swal.fire(
				  'Eliminado',
				  'Se eliminó la publicidad',
				  'success'
				)
				mutate(mediaList)

			  }
		  })

	}
   

	return (
		<div className='w-full h-96 rounded-lg  flex flex-col overflow-hidden shadow-2xl border-gray '>
			{
                isVideo(media.location) ? 
                ( <ReactPlayer url={basePath + media.location} muted={true} controls width={'100%'} height={'50%'} /> ) 
                : 
                ( <img className='w-full h-3/6 bg-black object-cover' src={basePath + media.location} alt='' /> )
            }
			<div className='h-[50%]'>
				<div className='flex flex-row-reverse p-1 justify-between'>
					<p className={`${media.state ? 'bg-successG text-success' : 'bg-dargerG text-danger' } w-auto px-2 py-1 rounded-md text-xs`}>
						{media.state ? 'Activo' : 'Inactivo'}
					</p>
					<SwitchMeda state={media.state} id={media.idImagenVideo} />

				</div>
				<div className='w-full h-[80%] flex items-center justify-between flex-col py-1 px-4 '>
					<div className=' w-full h-auto'>
                        <h1 className='capitalize text-xl mb-2'>{media.title}</h1>
                        <p className='capitalize text-sm text-font'>{media.description}</p>
                    </div>

					<div className='w-full flex justify-between'>
						<button className='w-5/12 bg-input hover:bg-black p-2 rounded text-white flex items-center justify-center gap-2 text-xs'
							onClick={showModalEdit}>
							<PencilSquareIcon className='h-4 w-4 text-blue-500 ' />
							Editar
						</button>
						<button className='w-5/12 bg-danger hover:bg-[#a4211d]     p-2 rounded text-white flex items-center justify-center gap-2 text-xs'
							onClick={() => deleteMediaAction(media.idImagenVideo)}>
							<TrashIcon className='h-4 w-4 text-blue-500 ' />
							Eliminar
						</button>
					</div>
				</div>  
			</div>
		</div>
	)
}
