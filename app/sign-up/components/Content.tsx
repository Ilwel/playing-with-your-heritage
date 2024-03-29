'use client'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import ShakeCard from '@/app/components/ShakeCard'
import { SIGN_UP } from '@/app/utils/graphql/mutations/UserMutations'
import { useSession } from '@/app/utils/hooks/useSession'
import { useTrigger } from '@/app/utils/hooks/useTrigger'
import { setLoading } from '@/app/utils/redux/features/laodingSlice'
import { type AppDispatch } from '@/app/utils/redux/store'
import { SignUpValidation } from '@/app/utils/validations/SignUpValidation'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function Content() {
  const router = useRouter()
  const [signUp] = useMutation(SIGN_UP)
  const formRef = useRef<HTMLFormElement>(null)
  const [errorTrigger, setErrorTrigger] = useTrigger()
  const [errors, setErrors] = useState<string[]>([])
  const validation = new SignUpValidation()
  const dispatch = useDispatch<AppDispatch>()
  useSession()

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
      try {
        dispatch(setLoading({ open: true }))
        await signUp({
          variables: {
            username: formData.get('username'),
            password: formData.get('password'),
          },
        })
        dispatch(setLoading({ open: false }))
        router.push('/sign-in')
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message)
          setErrors(['server:' + error.message])
          setErrorTrigger(true)
          dispatch(setLoading({ open: false }))
        }
      }
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
      </ShakeCard>
      <p className="text-red-500">{validation.convertToMessage(errors[0])}</p>
      <Link href="/sign-in"> I Already Have An Account</Link>
    </div>
  )
}
