# React Native Property Listing App - RaftLabs Assignment

This app is a property listing platform built with Expo and React Native.

## 🧪 Features

- Property listing with search bar
- Property detail with map and features
- Booking system with a bookings screen
- Profile screen showing user details
- Tab navigation (Home, Bookings, Profile)
- Integrated JSON Server mock API
- Modern UI with custom headers

## 📦 Tech Stack

- Expo + TypeScript
- React Native
- `expo-router` for navigation
- `twrnc` for Tailwind CSS-like styling
- `@tanstack/react-query` for API calls
- Zustand for state management
- JSON Server (mock API)

## 📱 Android Build

https://expo.dev/accounts/aj_birlaep/projects/property-app/builds/77331563-716e-42b3-b481-e1e38abae6cb

---

## 🧪 How to Run Locally

### Requirements:
- Node.js v18+
- Expo CLI
- Android Emulator or Expo Go app

### Steps:

```bash
git clone https://github.com/birla-AJ/property-booking-app.git
cd react-native-property-app-raftlabs
npm install
npx json-server --watch db.json --port 3001
npx expo start
