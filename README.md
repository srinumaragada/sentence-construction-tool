# Sentence Construction Tool

## Overview

The **Sentence Construction Tool** is an interactive web application built with **React** and **TypeScript** that helps users practice sentence construction. The app displays incomplete sentences and provides users with word options to fill in the blanks. The goal is to enhance users' sentence-building skills by allowing them to complete sentences correctly.

---

## Features

1. **Sentence Display**: 
   - The app shows incomplete sentences with missing words where users need to fill in the blanks.

2. **Word Options**: 
   - Users are given four word options to fill in the blanks.

3. **Unselect Word**: 
   - Users can unselect a word by clicking on a filled blank to change their selection.

4. **Timer**: 
   - Each question has a **30-second timer**. When the timer ends, the application auto-navigates to the next question.

5. **Next Button**: 
   - The "Next" button becomes active only when all blanks in the current sentence are filled.

6. **Feedback Screen**: 
   - After completing the quiz, users are presented with:
     - A summary of correct and incorrect answers.
     - The correct answers for any incorrect responses.
     - The user's score out of 10.

7. **State Management**: 
   - The app uses React state management to handle the flow of questions and user input.

8. **Data Fetching**: 
   - The application fetches question data from a provided JSON API using **JSON Server** to simulate a backend.

---

## Technical Stack

1. **Frontend**: React with **TypeScript** (Vite + React Template)
2. **Styling**: Tailwind CSS
3. **State Management**: React state hooks
4. **Backend Simulation**: JSON Server
5. **Deployment**: 
   - Frontend deployed on **Netlify**.
   - Backend (JSON Server) deployed on **Render**.

---

## Installation & Setup

To set up and run the Sentence Construction Tool locally, follow the steps below:

### 1. Clone the repository

```bash
git clone https://github.com/srinumaragada/sentence-construction-tool.git
cd sentence-construction-tool
```

### 2. Install dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Run the development server

Start the Vite development server:

```bash
npm run dev
```

### 4. Run JSON Server locally

To serve the question data, start JSON Server:

```bash
json-server --watch db.json --port 3000
```

This will serve the data from `db.json` on `http://localhost:3000`.

---

## Deployment

### 1. JSON Server Deployment (Backend)

To deploy the JSON server, you can use **Render**.

#### Steps to deploy JSON Server on Render:

1. Go to [Render](https://render.com/).
2. Create a new Web Service and select the **GitHub** repository option.
3. Connect your GitHub account and select your repository.
4. In the **Build Command**, use:
   ```bash
   npm install
   ```
5. In the **Start Command**, use:
   ```bash
   json-server --watch db.json --port 10000
   ```
6. Deploy and your JSON server will be accessible at a URL (e.g., `https://your-app-name.onrender.com`).

---

### 2. Frontend Deployment (React + TypeScript)

To deploy the frontend, you can use **Netlify**.

#### Steps to deploy the React app on Netlify:

1. Push your code to **GitHub** (if not already done).
2. Go to [Netlify](https://www.netlify.com/).
3. Select **New Site from Git**.
4. Connect your GitHub account, and select your repository.
5. Choose the **build command** as:
   ```bash
   npm run build
   ```
6. Choose the **publish directory** as:
   ```bash
   dist
   ```
7. Deploy the site, and your React app will be live at a URL (e.g., `https://your-app-name.netlify.app`).

---

## Troubleshooting

If you face any issues during development or deployment:

1. **Ensure Dependencies**: Check that all dependencies have been installed correctly.
2. **Check JSON Server**: Verify that JSON Server is running and accessible at `http://localhost:3000` or your deployed Render URL.
3. **Environmental Variables**: If you have any environment-specific configurations, make sure they're correctly set up in your `.env` file.
4. **JSON Server Error**: If you face issues with the JSON Server on Render, ensure that the `db.json` file is correctly uploaded to the repository and is accessible.

---

## Evaluation Criteria

The project is evaluated based on the following:

### UI/UX Design
- Visual design and aesthetics.
- Intuitive and responsive user experience.

### Frontend Functionality
- Proper working of the timer, fill-in-the-blanks mechanism, and question navigation.
- Feedback screen implementation.

### Code Quality
- Clean and readable code structure.
- Proper component structure and documentation.
- Git commit history.

---

## Enhancements

You can also extend the application by adding creative features such as:

- Animations for the timer or transitions between questions.
- Progress bar showing the remaining questions.
- Sound effects for time warnings or correct/incorrect answers.

---

## License

This project is licensed under the MIT License.

---

This **README** provides all the necessary details about the project, including setup, deployment, and the technical stack used. It’s structured to guide users through the process of setting up the app locally, deploying it, and troubleshooting common issues.

