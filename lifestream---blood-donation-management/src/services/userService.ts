import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface UserProfile {
  userId: string;
  fullName: string;
  email: string;
  bloodGroup: string;
  location: string;
  isAvailable: boolean;
  lastDonatedAt?: string;
  points: number;
}

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  const userDocRef = doc(db, 'users', userId);
  await updateDoc(userDocRef, data);
};
