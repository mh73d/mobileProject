
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IntroScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleStart = async () => {
    if (!name.trim()) {
      alert('الرجاء إدخال اسمك للمتابعة.');
      return;
    }
    await AsyncStorage.setItem('userName', name);
    navigation.replace('Main');
  };

  return (
    <ImageBackground source={require('../assets/note.jpg')} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={require('../assets/mood.png')} style={styles.image} />
        <Text style={styles.title}>مرحبًا بك في MoodLog</Text>
        <Text style={styles.subtitle}>
          تطبيق يساعدك على تتبع حالتك المزاجية اليومية وتحليل نمط مشاعرك مع مرور الوقت.
        </Text>
        <TextInput
          placeholder="اكتب اسمك هنا"
          style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 20, width: '80%', textAlign: 'center' }}
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>ابدأ الآن</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4C7974',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#204D48',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#CE6F51',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 2,
  },
  buttonText: {
    color: '#F7E1DA',
    fontSize: 16,
  },
});