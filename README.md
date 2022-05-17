# BigLab 2

## Team name: TEAM_NAME

Team members:
* s295229 ARCOLINI DAVIDE
* s265375 JIANG HONGJUAN
* s294547 BIANCHI GIULIA

## Instructions

A general description of the BigLab 2 is available in the `course-materials` repository, [under _labs_](https://polito-wa1-aw1-2022.github.io/materials/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://polito-wa1-aw1-2022.github.io/materials/labs/GH-Classroom-BigLab-Instructions.pdf), covering BigLabs and exam sessions.

Once you cloned this repository, please write the group name and names of the members of the group in the above section.

In the `client` directory, do **NOT** create a new folder for the project, i.e., `client` should directly contain the `public` and `src` folders and the `package.json` files coming from BigLab1.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.
Remember that `npm install` should be executed inside the `client` and `server` folders (not in the `BigLab2` root directory).

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## Registered Users

Here you can find a list of the users already registered inside the provided database. This information will be used during the fourth week, when you will have to deal with authentication.
If you decide to add additional users, please remember to add them to this table (with **plain-text password**)!

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |

## List of APIs offered by the server

- **API: `GET /films`**
\
    `GET /films`
    Retrieve the list of all the available films.
    - **Request header** has a line: `Content-Type: application/json`.
    - **Request body** is empty.
    - **Response**: `200 OK` (success). Return a list of JSON objects, containing all the films stored in the Database. The **response body** has the following structure:  
    ```JSON
    [
        {
            "id": 1,
            "title": "Pulp Fiction", 
            "favorite": 1,
            "watchdate": "2022-03-11",
            "rating": 5
        },

        {
            "id": 2,
            "title": "21 Grams", 
            "favorite": 0,
            "watchdate": "2022-03-17",
            "rating": 2
        },

        ...
    ]
    ```
    - **Error responses**: 
        - `400 BAD REQUEST` (the request is not in the specified format)
        - `500 INTERNAL SERVER ERROR` (generic error if the server crashes)    
---
- **API: `GET /films/filter/:filter`**
\
    `GET /films/filter/:filter`
    Retrieve a list of all the films that fulfill a given filter (i.e., the same filters described in BigLab1).
    - **Request header** has a line: `Content-Type: application/json` and `:filter` parameter to select the filter.
    - **Request body** is empty.
    - **Response**: `200 OK` (success). Return a list of JSON objects, containing all the films stored in the Database that fulfill the selected filter. The **response body** has the following structure: 
    ```JSON
    [
        {
            "id": 1,
            "title": "Pulp Fiction", 
            "favorite": 1,
            "watchdate": "2022-03-11",
            "rating": 5
        },

        {
            "id": 5,
            "title": "Shrek", 
            "favorite": 1,
            "watchdate": "2022-03-24",
            "rating": 5
        },

        ...
    ]
    ```
    - **Error responses**: 
        - `400 BAD REQUEST` (the request is not in the specified format)
        - `422 UNPROCESSABLE ENTITY` (the filter chosen does not exists)
        - `500 INTERNAL SERVER ERROR` (generic error if the server crashes)  
---

- **API: `GET /films/:id`**
\
    `GET /films/:id`
    Retrieve a film, given its “id”.
    - **Request header** has a line: `Content-Type: application/json` and `:id` parameter to select the film. `id` should be a number.
    - **Request body** is empty.
    - **Response**: `200 OK` (success). Return a JSON object, representing the film stored in the Database that corresponds to the chosen id. The **response body** has the following structure: 
    ```JSON
    {
        "id": 1,
        "title": "Pulp Fiction", 
        "favorite": 1,
        "watchdate": "2022-03-11",
        "rating": 5
    }
    ```
    - **Error responses**: 
        - `400 BAD REQUEST` (the request is not in the specified format)
        - `422 UNPROCESSABLE ENTITY` (the id chosen is not in the specified format)
        - `404 NOT FOUND` (the film that corresponds to the `id` chosen does not exist)
        - `500 INTERNAL SERVER ERROR` (generic error if the server crashes) 
---

- **API: `POST /film`**
\
    `POST /film`
    Create a new film, by providing all relevant information – except the “id” that will be automatically assigned by the back-end.
    - **Request header** has a line: `Content-Type: application/json`
    - **Request body** is a JSON object containing all the relevant information. The structure of the body is the following: 
    ```JSON
    {
        "title": "Goodfellas", 
        "favorite": 1,
        "watchdate": "2022-05-12",
        "rating": 5
    }
    ```
    - **Response**: `201 CREATED` (success).
    - **Error responses**: 
        - `422 UNPROCESSABLE ENTITY` (the request body is not in the specified format)
        - `500 INTERNAL SERVER ERROR` (generic error if the server crashes) 
---

- **API: `PUT /film/:id`**
\
    `PUT /film/:id`
    Update an existing film, by providing all the relevant information, i.e., all the properties except the “id” will overwrite the current properties of the existing film. The “id” will not change after the update.
    - **Request header** has a line: `Content-Type: application/json` and `:id` parameter to select the film. `id` should be a number.
    - **Request body** is a JSON object containing all the relevant information. If some fields doesn't change, send the old value. The structure of the body is the following: 
    ```JSON
    {
        "title": "Goodfellas", 
        "favorite": 1,
        "watchdate": "2022-05-12",
        "rating": 5
    }
    ```
    - **Response**: `200 OK` (success).
    - **Error responses**: 
        - `400 BAD REQUEST` (the request is not in the specified format)
        - `404 NOT FOUND` (the film that corresponds to the `id` chosen does not exist)
        - `422 UNPROCESSABLE ENTITY` (the request body or the `id` are not in the specified format)
        - `500 INTERNAL SERVER ERROR` (generic error if the server crashes) 
---

- **API: `PUT /film/:id/favorite`**
\
    `PUT /film/:id/favorite`
    Mark an existing film as favorite/unfavorite.
    - **Request header** has a line: `Content-Type: application/json` and `:id` parameter to select the film. `id` should be a number.
    - **Request body** is a JSON object setting the `favorite` film to values `1` or `0`. The structure of the body is the following: 
    ```JSON
    {
        "favorite": 1
    }
    ```
    - **Response**: `200 OK` (success).
    - **Error responses**: 
        - `400 BAD REQUEST` (the request is not in the specified format)
        - `404 NOT FOUND` (the film that corresponds to the `id` chosen does not exist)
        - `422 UNPROCESSABLE ENTITY` (the request body or the `id` are not in the specified format)
        - `500 INTERNAL SERVER ERROR` (generic error if the server crashes) 
---

- **API: `DELETE /film/:id`**
\
    `DELETE /film/:id`
    Delete an existing film, given its “id”.
    - **Request header** has a line: `Content-Type: application/json` and `:id` parameter to select the film. `id` should be a number.
    - **Request body** is empty.
    - **Response**: `204 NO CONTENT` (success).
    - **Error responses**: 
        - `400 BAD REQUEST` (the request is not in the specified format)
        - `404 NOT FOUND` (the film that corresponds to the `id` chosen does not exist)
        - `422 UNPROCESSABLE ENTITY` (the `id` is not in the specified format)
        - `500 INTERNAL SERVER ERROR` (generic error if the server crashes) 
---