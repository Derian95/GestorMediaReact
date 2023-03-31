import {create} from 'zustand'
import {StateStorage} from 'zustand/middleware'

interface UiState {
	showModal: boolean
	isEdit: boolean
	openModal: () => void
	closeModal: () => void
	isEditOn: () => void
	isEditOff: () => void
}

interface MediaState{
	idImagenVideo:number
	title:string
	description:string
	location:string
}

interface Media{
	idImagenVideo:number
	title:string
	description:string	
	location:string
	setStateMedia: (newState:MediaState) => void
	defaultMedia:()=>void
}

export const useUiStore = create<UiState>((set) => ({
	showModal: false,
	isEdit:false,
	openModal: () => set((state) => ({showModal: true})),
	closeModal: () => set((state) => ({showModal: false})),
	isEditOn: () => set((state) => ({isEdit: true})),
	isEditOff: () => set((state) => ({isEdit: false})),
}))



export const useMedia = create<Media>((set)=>({
	idImagenVideo:0,
	title:'',
	description:'',
	location:'',
	setStateMedia:(newState) =>set(newState),
	defaultMedia:() =>set(state=>({idImagenVideo:0,title:'',description:'',location:''})),

}))
