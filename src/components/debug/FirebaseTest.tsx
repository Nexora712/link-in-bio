'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function FirebaseTest() {
  const [status, setStatus] = useState('Testing...')

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Firebase connection...')
        const templatesRef = collection(db, 'templates')
        const snapshot = await getDocs(templatesRef)
        
        setStatus(`Success! Found ${snapshot.size} templates`)
        snapshot.forEach(doc => {
          console.log('Template:', doc.id, doc.data())
        })
      } catch (error: any) {
        console.error('Firebase test failed:', error)
        setStatus(`Failed: ${error.message || 'Unknown error'}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
      <h3>Firebase Test Status: {status}</h3>
    </div>
  )
}
