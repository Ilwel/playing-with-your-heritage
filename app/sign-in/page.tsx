import { Metadata } from "next"
import PageWrapper from "../components/PageWrapper"
import Content from "./components/Content"

export const metadata: Metadata = {
  title: 'Sign In'
}

export default function SignIn (){
  return (
    <PageWrapper>
      <Content/>
    </PageWrapper>
  )
}