import { ModalMedia } from '../components/ModalMedia'
import {useMedia, useUiStore} from '../store/uiStore'
import {MediaList} from '../components/MediaList'

export const Sgc = () => {
	const {openModal, isEditOff} = useUiStore()
    const {defaultMedia} =useMedia()

    const showModal=() => {
        isEditOff()
        defaultMedia()
        openModal()
    }
	return (
		<div className= 'w-[100vw] h-[100vh] flex items-center flex-col'>
            <ModalMedia/>
			<h1>Hola</h1>
			<button className='bg-success cursor-pointer p-4 rounded text-white hover:bg-[#31a66a]' onClick={showModal}>
				Abrir modal
			</button>
            <MediaList/>
		</div>
	)
}
