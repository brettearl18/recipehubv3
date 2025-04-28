import { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function FirebaseTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const testFirebase = async () => {
    setLoading(true);
    setMessage('Testing Firebase configuration...');

    try {
      // Test 1: Create a test user
      setMessage('Creating test user...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setMessage('Test user created successfully!');

      // Test 2: Write to Firestore
      setMessage('Writing to Firestore...');
      await setDoc(doc(db, 'test', 'test-doc'), {
        message: 'Firebase is working!',
        timestamp: new Date().toISOString(),
        userId: user.uid
      });
      setMessage('Firestore write successful!');

      // Test 3: Read from Firestore
      setMessage('Reading from Firestore...');
      const docRef = await getDoc(doc(db, 'test', 'test-doc'));
      if (docRef.exists()) {
        setMessage('Firestore read successful! Data: ' + JSON.stringify(docRef.data()));
      }

      // Test 4: Sign out
      setMessage('Signing out...');
      await signOut(auth);
      setMessage('All tests completed successfully! Firebase is properly configured.');

    } catch (error: any) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Firebase Configuration Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="test@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="password123"
          />
        </div>

        <button
          onClick={testFirebase}
          disabled={loading || !email || !password}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Firebase Configuration'}
        </button>

        {message && (
          <div className="mt-4 p-4 rounded-md bg-gray-50">
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
} 