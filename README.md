# Widget Display with Recommendations

This project is a simple recommendation widget that fetches video and article recommendations from an external API (Taboola API) and displays them on a webpage. It features error handling for failed API requests and renders content dynamically, such as videos and article thumbnails.

## Features

- Fetches recommendations from the Taboola API.
- Displays videos and articles with thumbnails or media content.
- Handles API errors gracefully by showing a user-friendly error message.
- Displays a loader while waiting for the recommendations to load.
- Supports both desktop view and responsive design for different devices.

## Tech Stack

- JavaScript
- HTML
- CSS
- Jest for unit testing
- Taboola API for recommendations

## Clone the Repository

To clone this project and run it locally, use the following commands:
```bash
git clone https://github.com/mocharish/widget_display.git
cd widget_display
```

## Run the Project

To run the widget in your local environment:

Open index.html in your browser, you can double-click on the file or open it via your code editor.
The widget will fetch recommendations from the Taboola API and display them within the #recommendation-widget div.
Note that sometimes the API returnes an empty recommendation list so if you see "No recommendations available" keep refreshing until widgets are shown.

## Run Tests

To run the tests (using Jest):

Run the following command:

```bash
npm install
npm test
```

This will run Jest and execute the unit tests in the tests folder. You should see the results in the terminal.

## Folder Structure

/widget_display
│
├── /tests  
│ └── fetch.test.js  
│
├── index.html  
├── script.js  
├── styles.css  
└── README.md

### script.js

This is the main JavaScript file that:

- Fetches recommendations from the Taboola API.
- Handles the API response and error cases.
- Dynamically generates HTML content based on the recommendations (video or article).

### style.css

This file contains the styles for the widget, including the loader, recommendations, and media content.

### tests/fetch.test.js

This file contains unit tests that validate the behavior of the fetchRecommendations and renderRecommendations functions. It mocks the fetch API call and checks the rendering of the widget.
