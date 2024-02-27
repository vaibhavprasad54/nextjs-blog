import Nav from './components/Nav/Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider, TanstackProvider } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <TanstackProvider>
            {children}
          </TanstackProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
