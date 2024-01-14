# Zeal Task

## Overview
React Native task for Zeal interview process. Check the [Task repo](https://github.com/zeal-io/rn-test-task?tab=readme-ov-file) for more details.

> [!NOTE]  
> This project is developed using windows OS, so it's not tested -and will broke- if tested on ios

### Key Features
- **Admin Registration:** Allows users to sign up as Admin.
- **Admin Login:** Enables existing admins to log in.
- **Persisted Login** User will login once, then will be logged in automatically
- **Users Management:** Admins can add, update, or delete users profiles.
- **User Location Management:** Monitor full details of a specific user, add or delete theier locations
- **Friendly UX:** Show feeback to user on loading, newtwork request failure, etc..


https://github.com/AlaaElden98/ZealTask/assets/34111697/0288ec34-c993-40b7-80aa-c643cd82e6bb


## Technologies Used
- React Native
- TypeScript
- React Query

### Additional Packages
- `@react-native-async-storage/async-storage`
- `react-navigation`
- `react-native-config`
- `axios`
- `react-native-modal`

## Installation and Running the Project

### Prerequisites
- Set up React Native environment following the official [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).

### Steps to Run
1. Clone the repository
2. Add `.env` file with key `API_BASE_URL=YOUR_API_URL`
3. run `yarn install && yarn android`
