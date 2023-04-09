import React, {FC} from 'react'
import {useUiStore} from '../store/uiStore'

interface Props {
	children: React.ReactNode
}

export const ModalContainer: FC<Props> = ({children}) => {
	const {showModal} = useUiStore()

	showModal ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto')

	return (
		<div className={` backdrop-blur-sm fixed  h-full  w-full left-0 z-50 top-0  ${showModal ? 'cont-modal' : 'modalClose'}`}>
			{children}
		</div>
	)
}