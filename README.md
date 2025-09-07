# Book Analysis Project

This project is a web application that fetches books from the Gutenberg Project, analyzes them using the Gemini API, and visualizes the character interactions.

## Features

- **Book Search By Name**: Search for books from the Gutenberg Project by their name and presents options.
- **Book Fetching By Id**: Fetches the text of a selected book by Id.
- **Character Analysis**: Identifies the main characters in the book.
- **Interaction Analysis**: Analyzes the interactions between characters.
- **Token Counting**: Show the amount of tokens used when analyzing
- **Avatar Generation**: Generates avatars for the main characters.
- **Caching**: Caches API responses to improve performance and reduce costs.

## Getting Started

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/book-analysis.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd book-analysis
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

1.  Create a `.env.local` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open your browser and navigate to `http://localhost:3000`.

## Running Tests

To run the tests, use the following command:

```bash
npm run test
```
