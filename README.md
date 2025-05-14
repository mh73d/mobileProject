# MoodLog

MoodLog is a mobile app designed to help users track their daily moods with ease. It allows users to select how they feel each day (Happy, Neutral, Sad), add notes, and view a complete history of their mood entries. With a simple interface and local data storage, MoodLog helps users to better understand their emotional patterns over time.

---

**Features**
- **Mood Logging**: Choose your mood (Happy, Neutral, Sad) and optionally add a note.
- **Mood History**: Browse previous mood entries with the ability to edit or delete them.
- **Clean and Friendly UI**: User-friendly design with intuitive navigation.
- **Intro Screen**: A welcoming start screen that introduces the app’s purpose.
- **Mood Analysis (optional)**: Potential for visual and textual insights in the future.

---

## Demo Video

- **Demo Video**: 

---

## Technologies Used

- **React Native** (0.76+): Framework used to build the cross-platform mobile app.
- **AsyncStorage**: For storing mood entries locally on the device.
- **UUID**: Generates unique IDs for each mood entry.
- **DayJS**: Lightweight library for date formatting.
- **Expo**: Simplifies development and testing of React Native apps.

---

## Screen Structure

### 1. Intro Screen (`IntroScreen`)
- Welcomes the user and explains the app’s idea with a "Get Started" button.

### 2. Home Screen (`HomeScreen`)
- Allows users to select their current mood and optionally write a note.

### 3. History Screen (`HistoryScreen`)
- Displays past mood entries with options to edit or delete them.

### 4. Report Screen (`ReportScreen`) – *Optional*
- Presents visual or textual summaries of mood trends (can be developed later).

---

## Setup Instructions

### 1. Clone this Project
```bash
git clone <project-url.git>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Project
```bash
npm start
```

### 4. Open on Device or Emulator
- **Using Expo Go**: Scan the QR code shown in the terminal.
- **Android Emulator** or **iOS Simulator**: Follow Expo instructions to open the app.

---

## Assets and Configuration

- Place images or icons inside the `assets/` folder.
- No external configuration (like Firebase) is needed as the app stores data locally.

---

## Future Plans

- Add graphical charts to visualize mood trends.
- Daily reminder notifications to log mood.
- Add more mood types (e.g., Anxious, Excited).
- Export data to PDF or Excel.

---

## Notes

- No login is required. Each user is identified by a locally generated UUID.
- Data is stored on the user’s device to ensure full privacy.

---

## Resources

**UI Inspiration / Mood Tracker Designs**  
- [Design Inspiration](https://pin.it/42OQreyi2)

**Helpful Learning Videos**  
- [Intro to React Native]()  
- [Using AsyncStorage]()  

