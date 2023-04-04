import {useEffect, useState} from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import {useMedia, useUiStore} from '../store/uiStore'
import {ModalContainer} from './ModalContainer'
import ReactPlayer from 'react-player'
import axios from 'axios'
import  { mutate } from 'swr'
import {  mediaList } from '../api'
import {PaperAirplaneIcon} from '@heroicons/react/24/outline'
import { isVideo } from '../utils'
import noImage from '../assets/noImg.png'
import { basePath } from './MediaList'
import Lottie from "lottie-react";
import loaderButton from '../lottie/buttonLoader.json';
import { Toast } from './modals'
interface FormData {
	titulo: string
	descripcion: string
	imagen?: FileList
	imagenData?: string
}

export const ModalMedia = () => {
	const [previewSource, setPreviewSource] = useState<string>('');
	const [fileType, setFileType] = useState<string>('');
	const [loader, setLoader] = useState(false);
	

	const {idImagenVideo, title, description, location,defaultMedia} = useMedia()
	const {showModal, closeModal, isEdit,isEditOff} = useUiStore()

	const {register, handleSubmit, formState, setValue,reset} = useForm<FormData>()

	
	const onSubmit: SubmitHandler<FormData> = (data) => {
			let sendData = new FormData()
			sendData.append('IdImagenVideo',idImagenVideo.toString())
			sendData.append('title',data.titulo) 
			sendData.append('description',data.descripcion) 
			
			if(data?.imagen?.[0]){
				sendData.append('Imagefile', data.imagen[0]);
			}
			if(idImagenVideo!=0)
			{
				editMediaData(sendData)
			}
			else
			{
				postMediaData(sendData)
				
			}
		}

    const postMediaData=async(infoMedia:any) => {
		setLoader(true)
        const response = await axios.post('http://localhost:3005/apiGestor/Sgc/addMedia',infoMedia)
        const result = response.data
		closeModal()
		if(response){
            Toast.fire({
                icon: 'success',
                title: 'Publicidad agregada'
              })
              mutate(mediaList)

            }
		mutate(mediaList)
		setLoader(false)

      }

	  const editMediaData=async(infoMedia:any) => {
		setLoader(true)
        const response = await axios.put('http://localhost:3005/apiGestor/Sgc/updateMedia',infoMedia)
        const result = response.data
		closeModal()
		if(response){
            Toast.fire({
                icon: 'success',
                title: 'Publicidad modificada'
              })
              mutate(mediaList)

            }
		isEditOff()
		mutate(mediaList)
		setLoader(false)


      }
	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewSource(reader.result as string)
    }
    reader.readAsDataURL(file);

    setFileType(file.type);
  }

  const changeImage =() => {
	closeModal()
	isEditOff()

  }
	useEffect(() => {
       
		reset()
		
		if (isEdit) 
		{
			setValue('titulo', title)
			setValue('descripcion', description)
			setValue('imagenData', location)
			setValue('imagen', undefined)
			setPreviewSource('')
		} 
		else 
		{
			setValue('titulo', '')
			setValue('descripcion', '')
			setValue('imagenData', '')
			setValue('imagen', undefined)
			setPreviewSource('')

		}
	}, [showModal])

	return (
		<ModalContainer>
			<div
				className={` ${ showModal ? 'modalOpen' : 'm-prin-close' } w-5/6 mt-9 md:w-2/4 xl:w-4/12 bg-white shadow-2xl p-6`}>
				<div className='flex  justify-between mb-8'>
					<h1 className='text-2xl'>AGREGAR PUBLICIDAD</h1>
					<div onClick={ changeImage} className='cursor-pointer text-3xl'>x</div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					
					<div className='w-full flex flex-col mb-4'>
						<label htmlFor='titulo'>Título</label>
						<input
							className='bg-white p-2 rounded-lg border-[1px] border-[#8c8b8b]'
							type='text'
							id='titulo'
							{...register('titulo', {required: true})}
						/>
						{formState.errors.titulo && <span  className='text-error text-sm'>Título es obligatorio</span>}
					</div>

					<div className='w-full flex flex-col mb-4'>
						<label htmlFor='descripcion'>Descripción</label>
						<textarea className='bg-white rounded-lg p-2 border-[1px] border-[#8c8b8b]' id='descripcion'
							{...register('descripcion', {required: true})}></textarea>
						{formState.errors.descripcion && (
							<span className='text-error text-sm'>Descripción es obligatoria</span>
						)}
					</div>

					<div className='w-full flex flex-col '>
						<label htmlFor='imagen'>Imagen:</label>
						<input
							type='file'
							id='imagen'
							{...register('imagen', {required: !isEdit})}
							accept="image/jpg ,image/jpeg,image/png, video/mp4,video/webm,video/ogg"
							onChange={handleFileInputChange}
						/>
						{formState.errors.imagen && <span  className='text-error text-sm'>Imagen es obligatoria</span>}
					</div>
					<div className=' flex flex-col items-center mb-4'>
					
						{
							previewSource==''?

							isVideo(location)?
							(
								<ReactPlayer
									url={basePath + location}
									muted={true}
									controls
									width={250}
									height={120}
								/>
							)
							:
							( 
								<img
									src={location==''?noImage:basePath+location}
									alt=''
									width={"250px"}
									height={"120px"}
									{...register('imagenData')}/>
							):
							fileType.startsWith('image') ? (
								<img src={previewSource} alt="Preview" width={250} height={120}/>
							  ) : (
								<ReactPlayer
									url={previewSource}
									muted={true}
									controls
									width={250}
									height={120}
								/>
							  )
						}

					</div>
					<button className={`${loader ? 'bg-gray':'bg-base hover:bg-baseH'}  text-white  rounded w-full flex gap-2 items-center justify-center`} type='submit' disabled={loader}>
						{
							loader?
							(
									<Lottie animationData={loaderButton} loop className='h-10 w-auto'/>
							)
							:
							(
								<>
									Enviar
									<PaperAirplaneIcon className='h-10 w-5 text-blue-500 ml-4' />
								</>
							)
						}
						
						
					</button>
				</form>
			</div>
		</ModalContainer>
	)
}
