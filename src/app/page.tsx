'use client'
import { Button } from '@chakra-ui/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex justify-center gap-8 items-center min-h-[calc(100vh-200px)]">
      <Button colorScheme='blue' className='w-[200px] bg-[#2b6cb0]'>
        Record Contract
      </Button>
      <Button colorScheme='green' className='w-[200px] bg-[#37a169]'>
        Settle Dispute
      </Button>
    </main>
  )
}
