# MoodLog

MoodLog is a mobile app designed to help users track their daily moods with ease. It allows users to select how they feel each day (Happy, Neutral, Sad), add notes, and view a complete history of their mood entries. With a simple interface and local data storage, MoodLog helps users to better understand their emotional patterns over time.

---

**Features**
- **Mood Logging**: Choose your mood (Happy, Neutral, Sad) and optionally add a note.
- **Mood History**: Browse previous mood entries with the ability to edit or delete them.
- **Clean and Friendly UI**: User-friendly design with navigation.
- **Intro Screen**: A welcoming start screen that introduces the app’s purpose.


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

### 4. Report Screen (`ReportScreen`) 
- Presents textual summaries of user's mood.

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
   - **Use Expo Go**: Scan the QR code from the terminal.
   - **For Android Emulator**: 
     - Install **Android Studio** and set up **Android Virtual Device**.
     - Press `a` in the terminal to open it in the Android emulator.
   - **For iOS Simulator**: 
     - Install **Xcode** and open the iOS Simulator.
     - Press `i` in the terminal to open it in the iOS Simulator.

---

## Assets and Configuration

- Place images or icons inside the `assets/` folder.
- No external configuration (like Firebase) is needed as the app stores data locally.

---

## Future Plans

- Add graphical charts to visualize mood trends.
- Daily reminder notifications to log mood.
- Add more mood types (e.g., Anxious, Excited).


---

## Notes

- No login is required. Each user is identified by a locally generated UUID.
- Data is stored on the user’s device to ensure full privacy.

---

## Resources



