import Button from "./components/Button";
import H1Anim from "./components/H1Anim";

export default function Home() {
  return (
    <main className="home">
      <H1Anim texts={['Playing With Your Inheritance']} />
      <Button delay={2}>Start</Button>
    </main>
  )
}
