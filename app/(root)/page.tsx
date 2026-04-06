import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex items-center justify-center p-2'>
      <SignUp />
    </main>
  )
}



