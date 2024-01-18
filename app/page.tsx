import Button from "./components/Button";
import H1Anim from "./components/H1Anim";
import PageWrapper from "./components/PageWrapper";

export default function Home() {
  return (
    <main className="home">
      <H1Anim texts={['Playing With Your Inheritance']} />
      <Button href="/sign-in" delay={2}>Start</Button>
    </main>
  )
}
