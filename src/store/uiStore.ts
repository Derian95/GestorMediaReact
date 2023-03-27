import {create} from 'zustand'

interface UiState {
	showModal: boolean
	isEdit: boolean
	openModal: () => void
	closeModal: () => void
	isEditOn: () => void
	isEditOff: () => void
}

interface MediaState{
	id:number
	title:string
	description:string
	url:string
}
interface Media{
	id:number
	title:string
	description:string	
	url:string
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
	id:0,
	title:'',
	description:'',
	url:'',
	setStateMedia:(newState) =>set(newState),
	defaultMedia:() =>set(state=>({id:0,title:'',description:'',url:''})),

}))
