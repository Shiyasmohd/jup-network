'use client'
import { Button } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex justify-center gap-8 items-center min-h-[calc(100vh-200px)]">
      <Link href="/record-contract">
        <Button colorScheme='blue' className='w-[250px] bg-[#2b6cb0] h-[100px]'>
          Register Contract
        </Button>
      </Link>
      <Link href="settle-dispute">
        <Button colorScheme='green' className='w-[250px] bg-[#37a169] h-[100px]'>
          Settle Dispute
        </Button>
      </Link>
    </main>
  )
}
