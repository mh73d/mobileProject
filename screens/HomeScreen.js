import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import { saveMoodEntry } from '../utils/storage';
import uuid from 'react-native-uuid';
import dayjs from 'dayjs';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState('');

  const handleSave = async () => {
    if (!mood) {
      Alert.alert('تنبيه', 'الرجاء اختيار حالتك المزاجية');
      return;
    }

    const userName = await AsyncStorage.getItem('userName');
    const entry = {
      id: uuid.v4(),
      date: dayjs().format('YYYY-MM-DD'),
      mood,
      note,
    };

    await saveMoodEntry(entry);
    try {
      if (userName) {
        await addDoc(collection(db, `users/${userName}/entries`), entry);
      }
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    }

    setMood(null);
    setNote('');
    Alert.alert('تم الحفظ', 'تم تسجيل حالتك المزاجية بنجاح');
  };

  return (
    <ImageBackground source={require('../assets/notePaper.jpg')} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>كيف كان مزاجك اليوم؟</Text>
          <View style={styles.moodRow}>
            <TouchableOpacity onPress={() => setMood('happy')}>
              <Image source={require('../assets/happy.png')} style={[styles.moodImage, mood === 'happy' && styles.selectedMood]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMood('neutral')}>
              <Image source={require('../assets/neutral.png')} style={[styles.moodImage, mood === 'neutral' && styles.selectedMood]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMood('sad')}>
              <Image source={require('../assets/sad.png')} style={[styles.moodImage, mood === 'sad' && styles.selectedMood]} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="اكتب ملاحظة إن وجدت..."
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
          />
          <View style={styles.buttonContainer}>
            <Button title="حفظ الحالة" onPress={handleSave} color="#204D48" />
          </View>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('Intro')}>
            <Text style={styles.backButtonText}>الرجوع إلى البداية</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4C7974',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  moodImage: {
    width: 80,
    height: 80,
    marginHorizontal: 15,
    borderRadius: 15,
  },
  selectedMood: {
    borderWidth: 3,
    borderColor: '#4C7974',
    borderRadius: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#87856C',
    backgroundColor: '#D4E6E1',
    borderRadius: 10,
    padding: 15,
    minHeight: 80,
    marginBottom: 20,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#388E3C',
    borderRadius: 10,
    overflow: 'hidden',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#CE6F51',
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#F7DFD7',
    fontWeight: 'bold',
  },
});

