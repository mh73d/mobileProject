import AsyncStorage from '@react-native-async-storage/async-storage';

const MOOD_KEY = 'moodEntries';

export const saveMoodEntry = async (entry) => {
  try {
    const existing = await AsyncStorage.getItem(MOOD_KEY);
    const entries = existing ? JSON.parse(existing) : [];
    entries.push(entry);
    await AsyncStorage.setItem(MOOD_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save mood entry:', e);
  }
};

export const getMoodEntries = async () => {
  try {
    const data = await AsyncStorage.getItem(MOOD_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load mood entries:', e);
    return [];
  }
};

export const deleteMoodEntry = async (id) => {
  try {
    const data = await getMoodEntries();
    const updated = data.filter(e => e.id !== id);
    await AsyncStorage.setItem(MOOD_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete mood entry:', e);
  }
};

export const updateMoodEntry = async (updatedEntry) => {
  try {
    const data = await getMoodEntries();
    const updated = data.map(e => (e.id === updatedEntry.id ? updatedEntry : e));
    await AsyncStorage.setItem(MOOD_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update mood entry:', e);
  }
};
