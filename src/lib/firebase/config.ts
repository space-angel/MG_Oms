import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8punkx4lvrX6kCaKudFUw9euohoM9Eg4",
  authDomain: "mgoms-v1.firebaseapp.com",
  projectId: "mgoms-v1",
  storageBucket: "mgoms-v1.firebasestorage.app",
  messagingSenderId: "252282634104",
  appId: "1:252282634104:web:8c4e321014e9ff9cc5128d"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 생성
export const db = getFirestore(app);

export default app; 