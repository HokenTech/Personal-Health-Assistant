# Personalized Health Assistant

This Personalized Health Assistant is a web application built with React, TypeScript, and Vite. It leverages the Google Generative AI API to provide users with health-related information and assistance.

## Features

1. **Symptom Checker**: Users can input their symptoms and receive general health insights and advice on when to seek professional medical help.

2. **Personalized Recommendations**: The app provides tailored health and wellness recommendations covering diet, exercise, sleep, and stress management.

3. **Virtual Health Coach**: An interactive chat interface where users can ask health-related questions and receive informative responses.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/personalized-health-assistant.git
   cd personalized-health-assistant
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google AI API key:
   ```
   VITE_GOOGLE_AI_API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with your actual Google AI API key.

## Running the Application

To start the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory.

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Google Generative AI API

## Important Notes

- This application is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
- Always consult with a qualified healthcare provider for medical concerns.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.