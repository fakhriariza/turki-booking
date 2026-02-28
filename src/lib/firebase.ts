import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Firestore,
  orderBy,
} from 'firebase/firestore';
import { Booking } from '@/types';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000000000',
};

let app: FirebaseApp;
let db: Firestore;

function getFirebaseApp() {
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

function getDb() {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

// ==================== BOOKING OPERATIONS ====================

/**
 * Create a new booking in Firestore
 */
export async function createBooking(booking: Omit<Booking, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(getDb(), 'bookings'), {
    ...booking,
    createdAt: new Date().toISOString(),
    status: 'pending',
  });
  return docRef.id;
}

/**
 * Get all bookings for a specific branch on a specific date
 */
export async function getBookingsByBranchAndDate(
  branchId: string,
  date: string
): Promise<Booking[]> {
  const q = query(
    collection(getDb(), 'bookings'),
    where('branchId', '==', branchId),
    where('date', '==', date),
    where('status', 'in', ['pending', 'confirmed'])
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Booking[];
}

/**
 * Get all bookings for a specific branch
 */
export async function getBookingsByBranch(branchId: string): Promise<Booking[]> {
  const q = query(
    collection(getDb(), 'bookings'),
    where('branchId', '==', branchId),
    orderBy('date', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Booking[];
}
