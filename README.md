# QuickFix Home Assist

QuickFix Home Assist is a comprehensive platform for booking home maintenance services, featuring real-time chat, AI diagnostics, and a community forum.

## Features

*   **Service Booking**: Easy booking for Electrical, Plumbing, HVAC, and more.
*   **Real-time Chat**: Communicate directly with technicians.
*   **AI Diagnostics**: Upload photos/videos to get instant AI-powered issue analysis and cost estimates.
*   **Community Forum**: Discuss home improvement topics and get advice.
*   **Technician Dashboard**: Dedicated interface for technicians to manage jobs.
*   **Admin Dashboard**: Platform management and analytics.

## Tech Stack

*   **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
*   **Backend**: Node.js, Express, MongoDB
*   **Real-time**: Socket.IO
*   **Authentication**: JWT

## Getting Started

### Prerequisites

*   Node.js & npm
*   MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```sh
    git clone <repository-url>
    cd quickfix-home-assist
    ```

2.  **Install Frontend Dependencies**
    ```sh
    npm install
    ```

3.  **Install Backend Dependencies**
    ```sh
    cd backend
    npm install
    ```

4.  **Environment Setup**
    *   Create a `.env` file in the `backend` directory.
    *   Add the following variables (see `backend/.env.example` if available):
        ```env
        PORT=5001
        MONGODB_URI=your_mongodb_uri
        JWT_ACCESS_SECRET=your_secret
        JWT_REFRESH_SECRET=your_refresh_secret
        FRONTEND_URL=http://localhost:8080
        ```

5.  **Run the Application**
    *   Start the Backend:
        ```sh
        cd backend
        npm run dev
        ```
    *   Start the Frontend:
        ```sh
        # In the root directory
        npm run dev
        ```

## License

This project is licensed under the MIT License.
