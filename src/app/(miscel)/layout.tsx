import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Open_Sans } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"

const font = Open_Sans({ subsets: ['latin'] })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Avita Health',
    description: 'Online Doctor Booking, Medical Tests, Telehealth Services',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" >
            <body className={font.className}>

                {children}

                <Toaster />
            </body>
        </html>
    )
}