**GitHub Todo App**

This GitHub repository hosts a powerful and intuitive To-Do application developed using React and TypeScript. With its sleek and user-friendly interface, this Todo app is designed to help you efficiently manage your tasks and stay organized.

**Running the Project Locally**

1. **Clone the Repository:**

   ```
   git clone https://github.com/tourniquet/todo-firebase.git
   ```

   Replace `your-username` with your GitHub username if you've forked the repository.

2. **Navigate to the Project Directory:**

   ```
   cd todo-firebase
   ```

3. **Install Dependencies:**

   ```
   npm install
   ```

   This command will install all the necessary dependencies based on the `package.json` file.

4. **Configure Firebase:**

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Set up Firebase Authentication with Google.
   - Create a Firebase Realtime Database and configure its rules.
   - Obtain your Firebase project configuration (apiKey, authDomain, projectId, etc.) and replace the placeholders in the project's configuration file (usually found at `src/firebase/config.ts`).

5. **Start the Development Server:**

   ```
   npm start
   ```

   This will start the development server, and the app will be accessible at `http://localhost:3000` by default.

6. **Open the App in Your Browser:**

   Open your web browser and navigate to `http://localhost:3000` to see the Todo app running locally.

**Key Features:**

- **User-Friendly Interface**: The app boasts a clean and intuitive interface, making it easy for users of all levels to navigate and add tasks effortlessly.

- **Task Management**: Add, edit, and delete tasks with just a few clicks. Sort your tasks by priority or due date for better organization.

- **Real-time Updates**: The app leverages Firebase to provide real-time synchronization of your tasks across multiple devices, ensuring that you stay up-to-date no matter where you are.

- **Authentication**: Securely log in with your Google account, ensuring that your tasks are accessible only to you.

- **Responsive Design**: Whether you're on a desktop, tablet, or mobile device, the app adapts seamlessly to your screen size, providing a consistent user experience.

**Live Demo:**
You can try out this Todo app by visiting the [live project here](https://todo-firebase-umber.vercel.app). 

**Technologies Used:**

- React
- TypeScript
- Firebase
- Vercel

Explore, test, and make changes to the project locally, and enjoy managing your tasks with this powerful Todo app!
