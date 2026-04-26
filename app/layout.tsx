import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
// import "@uploadthing/react/styles.css";
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
// import { cn } from "@/lib/utils";



const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})


export const metadata: Metadata = {
  title: 'Eventify',
  description: 'Eventify is a platform for managing and organizing events. It allows users to create, edit, and delete events.',
  icons: {
    icon: '/assets/images/logo.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.variable}>{children}</body>
    </html>
    </ClerkProvider>
  )
}




