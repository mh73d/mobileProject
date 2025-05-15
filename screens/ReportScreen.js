import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { getMoodEntries } from '../utils/storage';

export default function ReportScreen() {
  const [entries, setEntries] = useState([]);
  const [bestMood, setBestMood] = useState(null);
  const [worstMood, setWorstMood] = useState(null);

  useEffect(() => {
    (async () => {
      const allEntries = await getMoodEntries();
      setEntries(allEntries.reverse());

      const best = allEntries.reduce((prev, curr) =>
        curr.mood === 'happy' ? curr : prev, {}
      );
      const worst = allEntries.reduce((prev, curr) =>
        curr.mood === 'sad' ? curr : prev, {}
      );

      setBestMood(best);
      setWorstMood(worst);
    })();
  }, []);

  const getMoodMessage = (mood) => {
    if (mood === 'happy') return 'مبروك! استمر في السعي وراء السعادة.';
    if (mood === 'neutral') return 'اليوم كان متوسطًا، حاول أن تجعل غدًا أفضل!';
    return 'اليوم كان صعبًا. لا بأس، يمكننا دائمًا التحسن.';
  };

  return (
    <ImageBackground
      source={require('../assets/notePaper.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>ملخص المزاج الأسبوعي</Text>

        <Text style={styles.subTitle}>أفضل يوم</Text>
        {bestMood?.date ? (
          <Text style={styles.moodText}>
            {bestMood.date} - {bestMood.mood} {bestMood.note ? `: ${bestMood.note}` : ''}
          </Text>
        ) : (
          <Text>لا توجد بيانات كافية.</Text>
        )}

        <Text style={styles.subTitle}>أسوأ يوم</Text>
        {worstMood?.date ? (
          <Text style={styles.moodText}>
            {worstMood.date} - {worstMood.mood} {worstMood.note ? `: ${worstMood.note}` : ''}
          </Text>
        ) : (
          <Text>لا توجد بيانات كافية.</Text>
        )}

        <Text style={styles.subTitle}>ملاحظات الأيام الماضية</Text>

        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ImageBackground
              source={require('../assets/stickynote.png')}
              style={styles.noteBackground}
              imageStyle={styles.noteImage}
              resizeMode="stretch"
            >
              <View style={styles.noteOverlay}>
                <TouchableOpacity style={styles.item}>
                  <View style={styles.moodContainer}>
                    <Text style={styles.moodDate}>{item.date}</Text>
                    <Text style={styles.moodLabel}>{item.mood}</Text>
                  </View>
                  <Text style={styles.moodMessage}>{getMoodMessage(item.mood)}</Text>
                  {item.note ? (
                    <Text style={styles.moodNote}>{item.note}</Text>
                  ) : (
                    <Text style={styles.noNote}>لا توجد ملاحظات لهذا اليوم.</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ImageBackground>
          )}
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
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4C7974',
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#204D48',
  },
  moodText: {
    fontSize: 16,
    color: '#204D48',
    marginBottom: 15,
  },
  item: {
    flex: 1,
    padding: 15,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDate: {
    fontSize: 16,
    color: '#6F93CD',
  },
  moodLabel: {
    fontSize: 16,
    color: '#424242',
  },
  moodMessage: {
    fontSize: 14,
    color: '#616161',
    marginTop: 5,
  },
  moodNote: {
    fontSize: 14,
    color: '#424242',
    marginTop: 10,
  },
  noNote: {
    fontSize: 14,
    color: '#9e9e9e',
    marginTop: 10,
  },
  noteBackground: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'stretch',
    minHeight: 120,
  },
  noteImage: {
    resizeMode: 'stretch',
    borderRadius: 12,
  },
  noteOverlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    justifyContent: 'center', // vertical center
    padding: 10,
  },
});

