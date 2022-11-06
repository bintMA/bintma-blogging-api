# Blog App

This is an api for a blog app

---

## Requirements

1. Users should have a first_name, last_name, email, password, (you can add other
   attributes you want to store about the user)
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs
   created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs.
    a. The endpoint should be paginated
    b. It should be filterable by state
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged
    in users should be paginated,
    a. default it to 20 blogs per page.
    b. It should also be searchable by author, title and tags.
    c. It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog.
17. Write tests for all endpoints.

## Setup

- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---

## Base URL

- http://localhost:4000

## Models

---

### User

| field     | data_type | constraints                                      |
| --------- | --------- | ------------------------------------------------ |
| id        | string    | required                                         |
| username  | string    | required                                         |
| firstname | string    | optional                                         |
| lastname  | string    | optional                                         |
| email     | string    | optional                                         |
| password  | string    | required                                         |
| user_type | string    | required, default: user, enum: ['user', 'admin'] |

### Order

| field         | data_type | constraints                     |
| ------------- | --------- | ------------------------------- |
| id            | string    | required                        |
| created_at    | date      | required                        |
| state         | number    | required,default:1              |
| total_price   | number    | required                        |
| items         | array     | required                        |
| item.name     | string    | required                        |
| item.price    | number    | required                        |
| item.size     | string    | required, enum: ['m', 's', 'l'] |
| item.quantity | number    | required, enum: ['m', 's', 'l'] |

## APIs

---

### Signup User

- Route: /signup
- Method: POST
- Body:

```
{
  "firstname": "Adeola",
  "lastname": "Adelodun",
  "email": "adeola@gmail.com",
  "password": "adeade"
}
```

- Responses

```
{
  "message": "Signup successfull",
  "user": {
    "email": "adeola@gmail.com",
    "createdAt": "2022-11-06T17:35:52.567Z",
    "_id": "6367f13370eea8a1a70503de",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRlb2xhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMTEtMDZUMTc6MzU6NTIuNTY3WiIsIl9pZCI6IjYzNjdmMTMzNzBlZWE4YTFhNzA1MDNkZSIsIl9fdiI6MH0sImlhdCI6MTY2Nzc1NjM0MH0.zsuWCyscLy76GXchH-pI5gj3bhLFUBEkff7NCkYKCLY"
}


---

### Login User

- Route: /login
- Method: POST
- Body:

```

{
"email": "adeola@gmail.com",
"password": "adeade"
}

```

- Responses

```

{
"status": "success",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjdkZTc0MzgzMDRiNjljMTY3MTc2NSIsImVtYWlsIjoiYWRlb2xhQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJBZGVvbGEiLCJsYXN0X25hbWUiOiJBZGVsb2R1biIsImNyZWF0ZWRBdCI6IjIwMjItMTEtMDZUMTY6MTU6MTcuNjQ3WiIsIl9fdiI6MH0sImlhdCI6MTY2Nzc1MjUyNH0.SCQ7fYiTGmjNNTuc-sU6UZfie5YEuARswS4v40dhM8A"
}

---

### Create Blog

- Route: /blog
- Method: POST
- Body:

```

{
"title": "My first blog",
"description": "new blog",
"body": "This is my first blog",
"tags": "lifestyle"

}

```

- Response

```

{
"status": "success",
"Blog": [
{
"\_id": "6367e00c38304b69c1671768",
"title": "My first blog",
"description": "new blog",
"author_id": "6367de7438304b69c1671765",
"state": "draft",
"read_count": 0,
"reading_time": "0.05 minute",
"tags": [
"lifestyle"
],
"body": "This is my first blog",
"timestamp": "2022-11-06T16:15:17.756Z",
"\_\_v": 0
}
]
}

```

---

### Get Blog

- Route: /blogs
- Method: GET
- Header
  - Authorization: Bearer {token}
- Responses


```

{
  "status": "success",
  "blogList": 0,
  "Blogs": []
}

```

---

### Get by Id

- Route: /blogs/_id
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Query params:
  - page (default: 1)
  - per_page (default: 10)
  - order_by (default: created_at)
  - order (options: asc | desc, default: desc)
  - state
  - created_at
- Responses

Success

```

{
  "status": "success",
  "Blog": {
    "_id": "6367e00c38304b69c1671768",
    "title": "My first blog",
    "description": "new blog",
    "author_id": null,
    "state": "draft",
    "read_count": 1,
    "reading_time": "0.05 minute",
    "tags": [
      "lifestyle"
    ],
    "body": "This is my first blog",
    "timestamp": "2022-11-06T16:15:17.756Z",
    "__v": 0
  }
}
```

---

...

## Creator

- Adeola M. Adelodun

```

```
