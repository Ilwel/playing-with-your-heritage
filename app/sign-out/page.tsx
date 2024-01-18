import { Metadata } from "next";
import PageWrapper from "../components/PageWrapper";
import Content from "./components/Content";

export const metadata: Metadata = {
  title: 'Sign Up'
}


export default function SignOut(){
  return (
    <PageWrapper>
      <Content/>
    </PageWrapper>
  )
}