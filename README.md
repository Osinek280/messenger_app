# Messenger Clone App
This is a Messenger clone application built using React, TypeScript, Vite, React Router Dom, and CSS. It provides a user-friendly interface for sending messages and emoticons, conducting conversations with different users, and interacting with a database.
## Users Data
| username        | login              | password |
|-----------------|--------------------|----------|
| John Doe        | `john@example.com` | 123      |
| Jane Smith      | `jane@example.com` | 123      |
| Alice Johnson   | `alice@example.com`| 123      |

## Features
- LOGIN SYSTEM
- SEND MESSAGES AND EMOTICONS 😎
- THE ABILITY TO CONDUCT CONVERSATIONS WITH DIFFERENT USERS
- COMMUNICATION WITH THE DATABASE
## Tech Stack
App:
- REACT
- TYPESCRIPT
- VITE
- REACT ROUTER DOM
- CSS

DATABASE:
- TYPESCRIPT
- CORS
- UUID
## Data structure
Users:
```
  id: string;
  img: string;
  username: string;
  login: string;
  password: string;
```
Converstations:
```
  id: string;
  usersId: string[];
  lastActive: number;
```
Messages:
```
  id: string;
  title: string;
  ownerId: string;
  conversationId: string;
  date: number;
```

## Run Locally 🛠️

Clone the project

```bash
  git clone https://github.com/Osinek280/messenger_app
```

Go to the project directory

```bash
  cd messenger_app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
