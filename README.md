# RentalCar Frontend

## Project Goal

The goal of this project is to create the frontend part of a web application for the company **"RentalCar"**, which specializes in car rentals. The web app should include multiple pages such as a home page, a catalog page, and a detailed car page with information and a rental form.

To implement the functionality of managing car rental listings in your frontend app, use the ready-made backend API. The API documentation is available at:  
[https://car-rental-api.goit.global/api-docs/](https://car-rental-api.goit.global/api-docs/)

---

## Requirements

### 1. Framework and Libraries

- Built using Vite with React.
- Redux for state management.
- React Router for routing.
- Axios for HTTP requests.
- Any CSS solution of your choice (e.g., CSS modules, styled-components, MUI, etc.).

### 2. Main Pages

- **Home Page:** Should include a banner with a main call-to-action button.
- **Catalog Page:** Displays all available vehicles with filtering options by brand, price, and mileage, as well as the ability to add cars to favorites.
- **Car Details Page:** Displays detailed information about the selected car, including photos and a rental booking form.

### 3. Routing

- `/` – Home Page
- `/catalog` – Catalog Page
- `/catalog/:id` – Car Details Page

### 4. Application State

- Use Redux for state management.
- Create a global state to store the list of vehicles, filters state, and the list of favorites.
- When fetching filtered vehicles, clear previous results to ensure accuracy and relevancy of displayed data according to the new filter criteria.

### 5. Functional Requirements

- **Navigation:** User should be able to navigate to the catalog page by clicking the "View Catalog" button on the home page.
- **Filtering:** Vehicles can be filtered on the backend by:
  - Brand (single selection)
  - Price (single selection)
  - Mileage ("from" and/or "to" values)
- **Favorites:** Users can add vehicles to their favorites list, which should persist on page reload.
- **Mileage Display:** Mileage should be formatted with spaces as thousand separators, e.g., `5 000 km` instead of `5000 km`.
- **Details Navigation:** Users can click a "Read more" button on vehicle cards in the catalog to go to the details page.
- **Load More:** Catalog page should have a "Load More" button to fetch additional vehicles with applied filters (backend pagination).
- **Booking Form:** Users can rent a car by submitting a form on the car details page. Upon successful submission, a notification about the successful rental should appear.

### 6. Design

- Follow the provided design mockups.
- Layout should be done for desktop version; responsiveness is optional.

### 7. Development

- Use a component-based approach.
- Follow DRY (Don't Repeat Yourself) principles.
- Write clean, readable code with comments where necessary.
- The project should be deployed (e.g., on vercel.com or netlify.com).

---

## Installation and Running

1. Clone the repository:
   ```bash
   git clone https://github.com/Svetakler/rentalcar-frontend.git
   ```
