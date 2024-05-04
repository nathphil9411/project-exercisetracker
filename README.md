# Fitness API Documentation

Welcome to the Fitness API documentation. This API allows you to manage users and their exercise logs.

## Introduction

The Fitness API provides endpoints to manage users and their exercise logs. Users can be created, retrieved, and updated. Exercise logs can be added for users and retrieved as well.

### Base URL

The base URL for all endpoints is `https://your-api-url.com`.

## Endpoints

### Create a New User

- **Method:** `POST`
- **Endpoint:** `/api/users`
- **Description:** Create a new user by providing a username in the form data.
- **Returns:** An object containing the username and _id properties of the newly created user.

### Get All Users

- **Method:** `GET`
- **Endpoint:** `/api/users`
- **Description:** Retrieve a list of all users.
- **Returns:** An array of objects, each containing a user's username and _id.

### Add Exercise for a User

- **Method:** `POST`
- **Endpoint:** `/api/users/:_id/exercises`
- **Description:** Add an exercise for a specific user by providing description, duration, and optionally date in the form data. If no date is supplied, the current date will be used.
- **Returns:** The user object with the exercise fields added.

### Get User's Exercise Log

- **Method:** `GET`
- **Endpoint:** `/api/users/:_id/logs`
- **Description:** Retrieve the full exercise log of a specific user.
- **Returns:** A user object with a count property representing the number of exercises for that user, and a log array containing all exercises added.
  
#### Query Parameters

- `from` (optional): Start date (in yyyy-mm-dd format) to filter the log.
- `to` (optional): End date (in yyyy-mm-dd format) to filter the log.
- `limit` (optional): Limit the number of logs to retrieve.
