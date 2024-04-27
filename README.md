# expense-management
This application consists of PostgreSQL, Express, React and Node.js. Developed a full-stack web application with CRUD operations.

# Getting Started
  **run :** npm start- for frontend <br />
  nodemon server.js - for backend <br />
  login with **email: pop@gmail.com** , **password: pop** for better UI experience.
  
# Features of the Expense Management System
### 1. Login and Registration with Validation 
- **User Authentication**: The process of checking if you really are the person you claim to be, done by using JWT in backend.
- **User Authoriztion**: The process of checking of depending on your status/credentials , what you are allowed to do.
- **Form Validation**: Both the login and registration forms include client-side and server-side validation to check the correctness of input data, such as email format and mandatory fields, enhancing the application's reliability and user experience.
### 2. Expense Form
- **Data Entry**: Users can input details about their expenses through a user-friendly form interface. This form allows the entry of essential expense attributes such as date, amount, category, and a description.
- **Validation**: The expense form validates inputs to ensure data integrity, such as checking for valid numerical inputs for the amount and non-empty strings for required fields.
### 3. Expense Table with CRUD Operations
- **View Expenses**: Users can view a list of entered expenses in a tabular format, which includes all details such as date, amount, category, and description.
- **Update and Delete**: Each entry in the expense table includes options to edit or delete the expense, allowing for easy management of expense records.
- **Pagination and Sorting**: The table supports pagination and sorting to help users easily navigate and organize their expense data, making the interface scalable for a large number of entries.
### 4. Highcharts Integration
- **Data Visualization**: Integrates JS Highcharts Library to provide a graphical representation of expenses. This feature allows users to visualize their spending patterns over time and by category through dynamic pie charts.
- **Interactive Charts**: Users can interact with the chart to get a more detailed view of each category's expenses, helping them understand their spending habits better.
### 5. Responsive Design
- **Mobile-Friendly Interface**: The application is designed to be responsive, providing an optimal viewing experience across a wide range of devices, from desktops to mobile phones.
### Additional Information
- **Technologies Used**: React.js for the frontend, Node.js with Express for the backend, PostgreSQL for database management, JWT for authentication, and Highcharts for data visualization.
- **Security Features**: Includes secure handling of user authentication with JSON Web Tokens (JWT) and hashed passwords to protect user information.


<img width="937" alt="image" src="https://github.com/shalinichahar/expense-management/assets/70834279/967219da-02b9-4f17-ad64-fa114d0e2d74">
<img width="941" alt="image" src="https://github.com/shalinichahar/expense-management/assets/70834279/26165ef4-45bd-4d17-9200-f388ac3a74ab">
<img width="955" alt="image" src="https://github.com/shalinichahar/expense-management/assets/70834279/4d94c1d8-ed4e-4fa4-ae86-049e9473db2b">
<img width="928" alt="image" src="https://github.com/shalinichahar/expense-management/assets/70834279/1599b6a5-f908-4d6d-b138-d001126c7343">


# Why use PostgreSQL?

- Free and open source.
- Available in multiple languages.
- Highly Extensible.
- Protects data integrity.
- Builds fault-tolerant environments.
- Robust access-control system
- Supports international characters.
  
# Why use Express?

- Provides a robust set of features for both web and mobile applications
- Makes back-end code easier and simpler to write.
- Supports many middleware.
- Minimal and Flexible web application framework.
- Creating efficient and robust API is quick and easy.
- Allows us to define an error handling middleware.
  
# Why use React?

- Virtual DOM in ReactJS makes user experience better and developer’s work faster.
- It guarantees stable code.
- React allows its components to be reused saving time and effort.
- Provides high performance.
- Provide the feature of Virtual DOM.
- SEO friendly!
