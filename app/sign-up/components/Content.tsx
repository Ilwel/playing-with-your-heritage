'use client'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import ShakeCard from '@/app/components/ShakeCard'
import { SIGN_UP } from '@/app/graphql/mutations/UserMutations'
import { useTrigger } from '@/app/hooks/useTrigger'
import { SignUpValidation } from '@/app/validations/SignUpValidation'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { type FormEvent, useRef, useState } from 'react'

export default function Content() {
  const [signUp] = useMutation(SIGN_UP)
  const formRef = useRef<HTMLFormElement>(null)
  const [errorTrigger, setErrorTrigger] = useTrigger()
  const [errors, setErrors] = useState<string[]>([])
  const validation = new SignUpValidation()

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formRef.current !== null) {
      const formData = new FormData(formRef.current)
      const errorList = validation.validate(formData)
      setErrors(errorList)
      if (errorList.length > 0) {
        setErrorTrigger(true)
        return
      }
      await signUp({
        variables: {
          username: formData.get('username'),
          password: formData.get('password'),
        },
      })
    }
  }

  return (
    <div className="sign-in flex flex-col gap-4">
      <ShakeCard trigger={errorTrigger}>
        <h1>Sign Up</h1>
        <form
          ref={formRef}
          onSubmit={async (e) => {
            await handleSignUp(e)
          }}
          className="flex flex-col gap-4"
        >
          <Input name="username" label="Username" />
          <Input name="password" label="Password" type="password" />
          <Input
            name="repeat-password"
            label="Repeat Password"
            type="password"
          />
          <Button type="submit" delay={0.5}>
            Sign Up
          </Button>
        </form>
        <p className="m-auto text-red-500">
          {validation.convertToMessage(errors[0])}
        </p>
      </ShakeCard>
      <Link href="/sign-in"> I Already Have An Account</Link>
    </div>
  )
}
