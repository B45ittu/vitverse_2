import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    console.log('Fetched users:', usersList); // Log fetched users for debugging
    return usersList;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return [];
  }
};

export default fetchUsers;
