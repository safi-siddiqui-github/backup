'use client' // Error boundaries must be Client Components

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const router = useRouter();

  return (
    <div className='flex flex-col gap-2 items-center justify-center p-5'>
      <h2 className='text-xl font-medium'>Product Folder</h2>
      <p className='text-lg'>Something went wrong!</p>
      <button
        className='rounded border px-2 py-1'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <button
        className='rounded border px-2 py-1'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => router.push('/')
        }
      >
        Go Home
      </button>
    </div>
  )
}