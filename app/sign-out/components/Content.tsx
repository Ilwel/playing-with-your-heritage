"use client"
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Link from "next/link";

export default function Content (){
  return (
    <div className="sign-in flex flex-col gap-4">
      <div className="card flex flex-col gap-6">
        <h1>Sign Up</h1>
        <div className="flex flex-col gap-4">
          <Input label="Username"/>
          <Input label="Password" type="password"/>
          <Input label="Repeat Password" type="password"/>
        </div>
        <Button delay={0.5}> Sign Up</Button>
      </div>
      <Link href="/sign-in"> I Already Have An Account</Link>
    </div>
  )
}