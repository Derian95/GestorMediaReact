import { ModalMedia } from '../components/ModalMedia'
import {useMedia, useUiStore} from '../store/uiStore'
import {MediaList} from '../components/MediaList'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { TimeSlideConfig } from '../components/TimeSlider/TimeSlideConfig'

export const Advertising= () => {
	const {openModal, isEditOff} = useUiStore()
    const {defaultMedia} =useMedia()
    const showModal=() => {
        isEditOff()
        defaultMedia()
        openModal()
    }
	return (
		<div className= 'w-full h-[100vh] flex items-center flex-col'>
            <ModalMedia/>
			<div className='w-5/6 max-w-7xl flex justify-between'>
				<button className='bg-base max-h-[45px] cursor-pointer p-2 rounded text-white hover:bg-baseH flex gap-2 justify-center items-center' onClick={showModal}>
				<PlusCircleIcon className="h-5 w-5 text-blue-500" />
				Agregar publicidad
				</button>
				<TimeSlideConfig/>

			</div>
		
            <MediaList/>
		</div>
	)
}
