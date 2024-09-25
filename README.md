# BuzzChat

- **Name**: Tharakadatta D Hegde
- **University**: Indian Institute of Technology Jodhpur
- **Department**: Computer Science & Engineering

## Overview
BuzzChat is a user-friendly messaging application designed for real-time communication, featuring one-to-one messaging, group chats, and an emotional support chatbot named PartnerBot. This project utilizes Next.js, TypeScript, MongoDB, and Pusher to deliver an engaging chat experience.

## Features
- One-to-one messaging service
- Group chat functionality
- Smart authentication with Google OAuth
- Emotional friend chatbot for mental and emotional support
- Real-time updates using Pusher
- User-friendly interface with a blue-red theme

## API Endpoints
- **`/api/register`**: Register a user in MongoDB.
- **`/api/chatbot`**: Send prompts to the Gemini API and receive responses.
- **`/api/conversations`**: Retrieve user conversations and message history.
- **`/api/messages`**: Send and receive messages in a conversation.

## Local Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <https://github.com/captainhaddock18/Buzzchat-Messaging-Service>
2. **Set Up MongoDB, Pusher, and Google OAuth**
- MongoDB Setup:
      Set up a MongoDB database:
      If using MongoDB Atlas, create a free cluster and Note the connection string as DATABASE_URL.
      If running MongoDB locally, make sure MongoDB is running and accessible.
- Pusher Setup:
      Sign up for a Pusher account.
      Create a new app in the Pusher dashboard.
      Note down the following credentials: APP_ID, APP_KEY, APP_SECRET, and CLUSTER.
- Google OAuth Setup:
      Go to the Google Cloud Console.
      Create a new project and set up OAuth 2.0 credentials:
      Client ID
      Client Secret
  
      
Step 3: Set Up Environment Variables
- Create a .env.local file in the root of the project and add these environment variables: 
GEMINI_API_KEY,GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_PUSHER_APP_KEY, NEXT_PUBLIC_PUSHER_CLUSTER. PUSHER_APP_ID, PUSHER_SECRET
- NEXTAUTH_URL = http://localhost:3020/
## Install Dependencies
- Once all environment variables are configured, install the necessary dependencies using Yarn:
   yarn install
- If you prefer npm, run:
   npm install
- Run this command: npx prisma db push

## Development Server
- Start the development server by running the following command:
npm run dev

## Open the Application on Browser 
http://localhost:3020
