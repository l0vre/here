import { auth } from '../firebaseConfig.ts'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.ts';

export const login = async(email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

export const getUserRole = async (uid: string): Promise<string | null> => {
    try {
        const userDocRef = doc(db, 'users', uid);

        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return userDoc.data()?.role || null;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user role: ', error);
        return null;
    }
}