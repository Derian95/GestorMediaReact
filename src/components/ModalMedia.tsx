import {useEffect} from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import {useMedia, useUiStore} from '../store/uiStore'
import {ModalContainer} from './ModalContainer'

import noImage from '../assets/noImg.png'
import axios from 'axios'
import { basePath } from './MediaList'

interface FormData {
	titulo: string
	descripcion: string
	imagen?: FileList
	imagenData?: string
}

export const ModalMedia = () => {
	const {idImagenVideo, title, description, location} = useMedia()
	const {showModal, closeModal, isEdit} = useUiStore()

	const {register, handleSubmit, formState, setValue,reset} = useForm<FormData>()

	const onSubmit: SubmitHandler<FormData> = (data) => {
        let sendData = new FormData()
        sendData.append('title',data.titulo) 
        sendData.append('description',data.descripcion) 
        if (data?.imagen?.[0]) {
            sendData.append('Imagefile', data.imagen[0]);
          }
          postMediaData(sendData)
	}
    const postMediaData=async(infoMedia:any) => {
        const response = await axios.post('http://localhost:801/sgc/addMedia',infoMedia)
        const result = response.data
        console.log(result)
      }

	useEffect(() => {
        reset()
		if (isEdit == true) {
			setValue('titulo', title)
			setValue('descripcion', description)
			setValue('imagenData', location)
			setValue('imagen', undefined)
		} else {
			setValue('titulo', '')
			setValue('descripcion', '')
			setValue('imagenData', '')
			setValue('imagen', undefined)
		}
	}, [idImagenVideo])

	return (
		<ModalContainer>
			<div
				className={` ${
					showModal ? 'modalOpen' : 'm-prin-close'
				} w-5/6 mt-14 md:w-2/4 xl:w-4/12 bg-white shadow-2xl p-6`}>
				<div className='flex  justify-between mb-8'>
					<h1 className='text-3xl'>AGREGAR PUBLICIDAD</h1>
					<div onClick={closeModal} className='cursor-pointer text-3xl'>x</div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='w-full flex flex-col mb-4'>
						<label htmlFor='titulo'>Título</label>
						<input
							className='bg-gray p-2 rounded-sm'
							type='text'
							id='titulo'
							{...register('titulo', {required: true})}
						/>
						{formState.errors.titulo && <span  className='text-error text-sm'>Título es obligatorio</span>}
					</div>
					<div className='w-full flex flex-col mb-4'>
						<label htmlFor='descripcion'>Descripción</label>
						<textarea
							className='bg-gray p-2 rounded-sm'
							id='descripcion'
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
						/>
						{formState.errors.imagen && <span  className='text-error text-sm'>Imagen es obligatoria</span>}
					</div>
					<div className='bg-input flex flex-col items-center mb-4'>
						<img
							src={location==''?noImage:basePath+location}
							alt=''
							width={150}
							height={100}
							{...register('imagenData')}
						/>
					</div>
					<button className='bg-primary text-white p-2 rounded w-full' type='submit'>Enviar</button>
				</form>
			</div>
		</ModalContainer>
	)
}
