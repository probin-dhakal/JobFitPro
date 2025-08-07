# Resume Builder

This is a comprehensive resume builder application with a robust backend for handling user authentication, resume data storage, and potentially advanced features like ATS analysis using Generative AI, and a dynamic frontend built with React.

## Features

### Frontend Features

*   **User Authentication:** Secure user registration and login system.
*   **Resume Creation:** Intuitive forms to build a resume from scratch, including sections for:
    *   Contact Information
    *   Profile Summary/Objective
    *   Work Experience
    *   Education
    *   Skills
    *   Projects
    *   Certifications
    *   Additional Information (Languages, Interests, etc.)
*   **Resume Editing and Updating:** Easily modify existing resume details.
*   **Multiple Resume Templates:** Choose from various professional templates to visualize and export your resume.
*   **Live Preview:** See how your resume looks in the selected template as you build it.
*   **Download/Export Options:** Generate and download your resume in PDF format.
*   **ATS Analysis (Potential):** If integrated, analyze your resume against job descriptions to improve its Applicant Tracking System compatibility.
*   **Image Uploads:** Option to upload a profile photo for your resume.
*   **Responsive Design:** The frontend is designed to be accessible and usable on various devices (desktops, tablets, mobile phones).
*   **Progress Tracking:** Visual indicators to show progress during resume creation or ATS analysis.
*   **Toast Notifications:** Provides user feedback for actions like saving, errors, etc.

### Backend Features

*   **RESTful API:** Provides a set of well-defined endpoints for the frontend to interact with.
*   **User Management:** Handles user registration, login, and authentication.
*   **Resume Data Storage:** Securely stores user resume data in a MongoDB database.
*   **Authentication Middleware:** Protects sensitive routes and ensures only authenticated users can access their data.
*   **File Upload Handling:** Manages the upload of files, potentially for profile photos or resume documents for analysis.
*   **Database Connectivity:** Establishes and manages the connection to the MongoDB database.
*   **Environment Variable Management:** Uses `.env` files to manage configuration settings securely.
*   **ATS Logic (Potential):** Integrates with Google's Generative AI to perform analysis on resume content.

## Technologies Used

### Frontend

*   **React:** JavaScript library for building user interfaces.
*   **Vite:** Fast frontend build tool.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **react-router-dom:** For handling client-side routing.
*   **Axios:** Promise-based HTTP client for API calls.
*   **html2canvas:** Captures HTML elements as images for resume previews/generation.
*   **pdfjs-dist:** PDF rendering library.
*   **react-to-print:** For printing or generating PDFs of React components.
*   **Moment.js:** For date and time manipulation.
*   **react-hot-toast:** For displaying notifications.
*   **react-icons:** Provides various icon sets.

### Backend

*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.
*   **MongoDB:** NoSQL document database.
*   **Mongoose:** ODM for MongoDB.
*   **bcryptjs:** For password hashing.
*   **jsonwebtoken:** For JSON Web Token based authentication.
*   **multer:** Middleware for handling file uploads.
*   **cors:** Enables Cross-Origin Resource Sharing.
*   **dotenv:** Loads environment variables from a `.env` file.
*   **@google/generative-ai:** (Potentially) For integrating with Google's Generative AI.
*   **Axios:** For making HTTP requests from the backend (if needed for external services).

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js and npm (or yarn):** Download from [nodejs.org](https://nodejs.org/).
*   **MongoDB:** Install MongoDB on your system or use a cloud-based service like MongoDB Atlas. Download from [mongodb.com](https://www.mongodb.com/try/download).
*   **Git:** Download from [git-scm.com](https://git-scm.com/).

## Getting Started

Follow these steps to set up and run the project locally:

1.  **Clone the Repository:**

    
```
bash
    git clone <repository_url>
    cd resume-builder
    
```
2.  **Backend Setup:**

    *   Navigate to the backend directory:

        
```
bash
        cd backend
        
```
*   Install backend dependencies:
```
bash
        npm install
        # or yarn install
        
```
*   Create a `.env` file in the `backend` directory. Add the following environment variables (replace with your actual values):
```
env
        PORT=5000 # Or any preferred port
        MONGO_URI=<your_mongodb_connection_string>
        JWT_SECRET=<a_secret_string_for_jwt>
        # Optional: If using Generative AI
        # GOOGLE_API_KEY=<your_google_generative_ai_api_key>
        
```
*   `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/resumebuilder` or your MongoDB Atlas connection string).
        *   `JWT_SECRET`: A random, strong string used to sign and verify JWTs.
        *   `GOOGLE_API_KEY`: (If using Generative AI) Your API key for Google Cloud services.

    *   Start the backend server:
```
bash
        npm run dev
        # or yarn dev
        
```
The backend server should start and connect to your MongoDB database.

3.  **Frontend Setup:**

    *   Navigate to the frontend directory:
```
bash
        cd ../frontend/resume-builder
        
```
*   Install frontend dependencies:
```
bash
        npm install
        # or yarn install
        
```
*   Create a `.env` file in the `frontend/resume-builder` directory. Add the following environment variables (replace with your actual values):
```
env
        VITE_BACKEND_API_URL=http://localhost:5000/api # Replace with your backend URL
        
```
*   `VITE_BACKEND_API_URL`: The URL of your running backend API.

    *   Start the frontend development server:
```
bash
        npm run dev
        # or yarn dev
        
```
The frontend application should open in your browser (usually at `http://localhost:5173/` or a similar address).

4.  **Using the Application:**

    *   Open your web browser and go to the frontend application URL.
    *   Register a new user account or log in if you already have one.
    *   Start building or editing your resumes!

## Project Structure

```
resume-builder/
├── backend/
│   ├── config/             # Database configuration
│   ├── controllers/        # Backend logic for routes
│   ├── middlewares/        # Express middleware (auth, upload)
│   ├── models/             # Mongoose models
│   ├── routes/             # API route definitions
│   ├── .env                # Environment variables for backend
│   ├── package.json        # Backend dependencies and scripts
│   └── server.js           # Entry point for the backend server
├── frontend/
│   └── resume-builder/
│       ├── public/         # Static assets
│       ├── src/
│       │   ├── assets/     # Images, fonts, etc.
│       │   ├── components/ # Reusable UI components
│       │   │   ├── Cards/
│       │   │   ├── Inputs/
│       │   │   ├── ResumeSections/
│       │   │   ├── ResumeTemplates/
│       │   │   └── layouts/
│       │   ├── context/      # React Context for state management
│       │   ├── pages/        # Application pages (Auth, Home, Dashboard, ATS, etc.)
│       │   │   ├── Auth/
│       │   │   ├── Home/
│       │   │   └── ResumeUpdate/
│       │   │       └── Forms/
│       │   ├── utils/        # Utility functions (API calls, helpers)
│       │   ├── App.jsx         # Main application component
│       │   ├── index.css       # Global CSS
│       │   └── main.jsx        # Application entry point
│       ├── .env              # Environment variables for frontend
│       ├── index.html          # Main HTML file
│       ├── package.json        # Frontend dependencies and scripts
│       └── vite.config.js      # Vite configuration
├── .gitignore              # Specifies intentionally untracked files that Git should ignore
└── README.md               # Project README file
```
## Contributing

If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

Please ensure your code adheres to the project's coding style and includes relevant tests if applicable.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or issues, please feel free to open an issue on the GitHub repository.
