import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center wrapper flex flex-between flex-col gap-4 p-5 text-center sm:flex-row'>

        <Link href="/">
        <Image src="/assets/images/logo.png" alt="Logo" width={40} height={40}/>
        </Link>

        <p>2026 Eventify. All Rights reserved.</p>


      </div>
    </footer>
  )
}

export default Footer
