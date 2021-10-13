import type { NextApiRequest, NextApiResponse } from 'next'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { firebaseConfig } from '../../../lib/firebase/constants'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

type Data = {
  id?: string
  name?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  try {
    const docSnap = await getDocs(collection(db, 'entries'))
    res
      .status(200)
      .json(docSnap.docs.map((d) => ({ id: d.id, name: d.data().name })))
  } catch (e) {
    res.status(404).json([{}])
  }
}
