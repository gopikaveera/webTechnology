import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp, 
  updateDoc, 
  doc, 
  deleteDoc,
  orderBy,
  limit
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export interface BloodRequest {
  id?: string;
  requesterId: string;
  requesterName: string;
  bloodGroup: string;
  hospitalName: string;
  location: string;
  reason?: string;
  urgency: 'Critical' | 'Urgent' | 'Normal';
  status: 'Open' | 'Fulfilled' | 'Cancelled';
  unitsNeeded?: number;
  createdAt: any;
}

export const createBloodRequest = async (requestData: Omit<BloodRequest, 'requesterId' | 'requesterName' | 'createdAt' | 'status'>) => {
  if (!auth.currentUser) throw new Error("User not authenticated");
  
  const requestsRef = collection(db, 'requests');
  return await addDoc(requestsRef, {
    ...requestData,
    requesterId: auth.currentUser.uid,
    requesterName: auth.currentUser.displayName || 'Anonymous',
    status: 'Open',
    createdAt: serverTimestamp(),
  });
};

export const subscribeToRequests = (callback: (requests: BloodRequest[]) => void) => {
  const requestsRef = collection(db, 'requests');
  const q = query(
    requestsRef, 
    where('status', '==', 'Open'),
    orderBy('createdAt', 'desc'),
    limit(20)
  );
  
  return onSnapshot(q, (snapshot) => {
    const requests = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BloodRequest[];
    callback(requests);
  }, (error) => {
    console.error("Error fetching requests:", error);
  });
};

export const updateRequestStatus = async (requestId: string, status: 'Fulfilled' | 'Cancelled') => {
  const requestRef = doc(db, 'requests', requestId);
  return await updateDoc(requestRef, { status });
};
