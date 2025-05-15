// utils/user.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const initUserId = async () => {
  try {
    let userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      userId = uuid.v4();
      await AsyncStorage.setItem('userId', userId);
    }
  } catch (error) {
    console.error('Error initializing user ID:', error);
  }
};
