import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  getMoodEntries,
  deleteMoodEntry,
  updateMoodEntry,
} from '../utils/storage';

export default function HistoryScreen() {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [noteInput, setNoteInput] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const data = await getMoodEntries();
        setEntries(data.reverse());
      })();
    }, [])
  );

  const handleDelete = async (id) => {
    Alert.alert('تأكيد الحذف', 'هل أنت متأكد من حذف هذه المدخلة؟', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: async () => {
          await deleteMoodEntry(id);
          const updated = await getMoodEntries();
          setEntries(updated.reverse());
        },
      },
    ]);
  };

  const handleEdit = (id, currentNote) => {
    setEditingId(id);
    setNoteInput(currentNote || '');
  };

  const handleSaveEdit = async (entry) => {
    await updateMoodEntry({ ...entry, note: noteInput });
    const updated = await getMoodEntries();
    setEntries(updated.reverse());
    setEditingId(null);
    setNoteInput('');
  };

  const getMoodImage = (mood) => {
    if (mood === 'happy') return require('../assets/happy.png');
    if (mood === 'neutral') return require('../assets/neutral.png');
    if (mood === 'sad') return require('../assets/sad.png');
    return null;
  };

  const getMoodColor = (mood) => {
    if (mood === 'happy') return 'rgba(139, 184, 133, 0.85)';
    if (mood === 'neutral') return 'rgba(189, 184, 141, 0.85)';
    if (mood === 'sad') return 'rgba(106, 162, 184, 0.85)';
    return 'rgba(255,255,255,0.85)';
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: getMoodColor(item.mood) }]}>
      <Text style={styles.date}>{item.date}</Text>
      <Image source={getMoodImage(item.mood)} style={styles.moodImage} />
      {editingId === item.id ? (
        <>
          <TextInput
            style={styles.input}
            value={noteInput}
            onChangeText={setNoteInput}
            placeholder="ملاحظة"
          />
          <TouchableOpacity onPress={() => handleSaveEdit(item)}>
            <Text style={styles.saveBtn}>💾 حفظ</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.note}>{item.note || 'بدون ملاحظة'}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleEdit(item.id, item.note)}>
              <Text style={styles.editBtn}>✏️ تعديل</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteBtn}>🗑 حذف</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/notePaper.jpg')} // Replace with your background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>📖 سجل المزاج</Text>
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4C7974',
    textAlign: 'center',
    marginTop: 40,
  },
  item: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
  moodImage: {
    width: 50,
    height: 50,
    marginVertical: 10,
    alignSelf: 'center',
  },
  note: {
    marginVertical: 8,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editBtn: {
    color: '#617697',
    fontWeight: 'bold',
  },
  deleteBtn: {
    color: '#CE6F51',
    fontWeight: 'bold',
  },
  saveBtn: {
    color: '#204D48',
    fontWeight: 'bold',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
});

