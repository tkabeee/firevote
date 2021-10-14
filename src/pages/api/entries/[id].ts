import type { NextApiRequest, NextApiResponse } from 'next'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { firebaseConfig } from '../../../lib/firebase/constants'

import { Entry } from '../../../models/entry'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Entry>
) {
  const {
    query: { id },
    method,
  } = req

  try {
    switch (method) {
      case 'GET':
        const docRef = doc(db, 'entries', id.toString())
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
          throw new Error('data does not exist')
        }
        res.status(200).json({ id: docSnap.id, name: docSnap.data().name })
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
        break
    }
  } catch (e) {
    res.status(404).json(<Entry>{})
  }
}
