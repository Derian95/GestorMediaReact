import { FC, useEffect, useState } from "react"
import Switch from "react-switch"
import { mediaList, postChangeState } from "../api";
import { mutate } from "swr";
import { Toast } from "./modals";


interface Props{
    state:boolean
    id:number
}

export const SwitchMeda:FC<Props> = ( { id, state } ) => {
    const [check, setCheck] = useState(false)
    

    const changeState=async(idMedia:number) => {
        setCheck(prev=>!prev)
		const response = await postChangeState(idMedia)
        console.log(response)
        if(response){
            Toast.fire({
                icon: 'success',
                title: 'Se cambio el estado'
              })
              mutate(mediaList)

            }
    }

    
    useEffect(() => {

        setCheck(state)
    }, []);

  
  return (
      <Switch
        checked={check}
        onChange={()=>changeState(id)}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={18}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={15}
        width={35}
        className="react-switch"
        id="material-switch"
        //onClick={()=>changeState(id)}
      />
  )
};
