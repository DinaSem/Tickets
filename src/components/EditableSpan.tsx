import React, {ChangeEvent, useState} from 'react';

type PropsType={
    title:string
    callBack:(title: string)=>void
}

export const EditableSpan = ({title,...props}:PropsType) => {
    let [edit,setEdit]=useState(false)
    let [InputTitle, setInputTitle] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }




const EditTrue = () => {
    setEdit(true)
}
    const EditFalse = () => {
        setEdit(false)
        props.callBack(InputTitle);
}
  return(
          edit
          ?<input value={InputTitle} onBlur={EditFalse} onChange={onChangeHandler}  autoFocus/>
          :<span onDoubleClick={EditTrue}>{title}</span>
  )
}