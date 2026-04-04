import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";



const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})


export const metadata: Metadata = {
  title: 'Eventify',
  description: 'Eventify is a platform for managing and organizing events. It allows users to create, edit, and delete events, as well as view upcoming events and RSVP to them.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>{children}</body>
    </html>
  )
}




