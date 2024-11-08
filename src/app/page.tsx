import Link from "next/link";

export default async function HomePage() {

    return <main className="w-full min-h-screen flex-center">
               Hello world
               <Link href='/signin'>Click me</Link>
        </main>
}