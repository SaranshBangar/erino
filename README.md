# Erino - Contact Management Mini Feature (SDE Internship Assignment)

A full-featured Contact Management system, built as part of the Erino SDE Internship assignment, using **React**, **Material UI (MUI)**, and **MySQL**. This application enables users to manage their contacts efficiently, supporting operations such as adding, viewing, updating, and deleting contact details. The frontend is designed with MUI for a clean, consistent UI, while the backend manages CRUD operations using MySQL for data storage.

---

## Project Overview

The **Contact Management** feature serves as a crucial part of any CRM (Customer Relationship Management) system. It allows users to store and manage important details about their clients or customers in a streamlined, organized way.

---

## Core Features

1. **Add New Contact**: 
   - Users can create a new contact with details such as First Name, Last Name, Email, Phone Number, Company, and Job Title.
   - Utilizes MUI components for a user-friendly, responsive form.
  
2. **View Contacts**: 
   - Displays contacts in a sortable and paginated MUI Table.
   - Users can easily browse large contact lists and view relevant details efficiently.
  
3. **Edit Contact Information**: 
   - Provides the ability to update contact details to ensure information remains accurate and up-to-date.
  
4. **Delete Contact**: 
   - Users can remove outdated or duplicate contacts, keeping the contact list clean.
  
---

## Images

![image](https://github.com/user-attachments/assets/a26faacc-09e0-499a-965c-45697cd9acb5)
![image](https://github.com/user-attachments/assets/606e46cb-6da2-4370-be8a-6dceb6bae843)
![image](https://github.com/user-attachments/assets/4c0d96c4-8104-44f4-aada-854e6ca3b9a9)
![image](https://github.com/user-attachments/assets/fe9ca5d3-758a-49ea-8232-742a8cfebc41)

---

## Tech Stack

- **Frontend**: React, Material UI (MUI)
- **Backend**: Node.js, Express
- **Database**: MySQL

---

## Prerequisites

- Node.js
- MySQL
- npm or yarn

---

## API Endpoints

- **POST** `/contacts`: Adds a new contact.
- **GET** `/contacts`: Retrieves all contacts.
- **PUT** `/contacts/:id`: Updates a specific contact.
- **DELETE** `/contacts/:id`: Deletes a contact by ID.

---

## Error Handling

- Validates required fields to ensure data integrity.
- Handles duplicate entries and returns descriptive error messages on API failures.

---

## Challenges and Solutions

1. **Challenge**: Ensuring a seamless user experience while managing form validation and error states.
   - **Solution**: Used MUI’s built-in validation and state management to provide real-time feedback and error handling.

2. **Challenge**: Implementing efficient pagination and sorting in the contact table.
   - **Solution**: Utilized MUI Table's built-in pagination features and integrated server-side sorting for optimal performance.

3. **Challenge**: Handling database connection errors and maintaining CRUD operation efficiency.
   - **Solution**: Implemented robust error handling and optimized SQL queries to minimize response time.

---

## Evaluation Criteria

- **Functionality**: All CRUD operations are complete and perform seamlessly.
- **UI Consistency**: MUI components provide a cohesive, responsive interface.
- **Code Quality**: Code is modular, follows best practices, and is well-documented.
- **Problem-Solving Approach**: Tackled challenges independently with creative, efficient solutions.

---

## Future Improvements

- Implement search and filter functionality for better user experience.
- Add authentication and user role management for enhanced security.
- Optimize backend with caching mechanisms to handle a larger number of contacts efficiently.

---

## 🏆 Conclusion

This Contact Management feature is a robust solution designed to simplify CRM processes, ensuring a seamless user experience and efficient contact management. The project demonstrates a comprehensive understanding of React, MUI, Node.js, and MySQL, showcasing clean code and thoughtful problem-solving.
