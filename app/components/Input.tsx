import { InputHTMLAttributes } from "react";

interface InputInterface extends InputHTMLAttributes<HTMLInputElement>{
  label: string
}

export default function Input( props : InputInterface ){
  return( 
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <input {...props} />
    </>
  )
}