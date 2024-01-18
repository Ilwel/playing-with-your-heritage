"use client"
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Link from "next/link";

export default function Content (){
  return (
    <div className="sign-in flex flex-col gap-4">
      <div className="card flex flex-col gap-10">
        <h1>Login</h1>
        <div className="flex flex-col gap-4">
          <Input label="Username"/>
          <Input label="Senha" type="password"/>
        </div>
        <Button delay={0.5}> Iniciar Sessão</Button>
      </div>
      <Link href="/sign-out"> Não possuo uma conta</Link>
    </div>
  )
}