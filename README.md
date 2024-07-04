# Appliance Dashboard Project

This project consists of a Next.js application that interfaces with a mock API server using JSON Server.

## Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v12 or higher)
- npm (or yarn)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/appliance-dashboard.git
   cd appliance-dashboard
   ```

2. Install dependencies for both the Next.js app and the mock API server:

   ```bash
   # Install Next.js app dependencies
   cd appliance-dashboard
   npm install

   # Install mock API server dependencies
   cd mock-server
   npm install
   ```

## Running the Application

### Running the Mock API Server

1. Navigate to the mock-server directory:

   ```bash
   cd appliance-dashboard/mock-server
   ```

2. Start the JSON Server using nodemon (watches for changes in server.js and db.json):

   ```bash
   nodemon server.js
   ```

The server will run on http://localhost:3001.

### Running the Next.js Application

1. In a new terminal, navigate back to the main project directory (if not already there):

   ```bash
   cd appliance-dashboard
   ```

2. Start the Next.js development server:

   ```bash
   npm run dev
   ```

The Next.js application will run on http://localhost:3000.

## Accessing the Application

Once both servers are running:

Open your web browser and go to http://localhost:3000 to access the Next.js application.
