# The Book Club - Server

A social media application that brings book lovers together. The goal of this applicaiton is to not only connect people online but in person as well. The site features:

- An authentication and authorization feature that allows users to create accounts and sign in

- A search functionality that utilizes the Google Books API 

- A favorites list that allows users to show off to friends there top reads

- A comment section that allows users to connect with one another to discuss books

- Ability to follow and unfollow users



## Future Updates and Additions
Some features that will be implemented in the future:

- Admin privliges provided to some users

- A list of book club events near the users location 

- A map displaying local coffee shops and libraries for users to meet up at

- More tweaking with CSS and picking out better colors 

- Improve error handling

- Find ways to make code more dry



## Tools and Technologies
Node.js | Express | Google Books API | Postgres | Sequelize 

## Routes

### Book

| Method | Route | Functionality |
|--------| ----- | --------------|
| Get | /books/:title | Search book titles using google API |
| Get | /books/:title/:author | Search book by title and author using google API |
| Post | /books | save book information to PG database |


### UserBook (Favorites)

| Method | Route | Funcitonality |
|--------|-------| --------------|
| Get | /favorites/:id | Search for a spceific book by id within PG database |
| Delete | /favorties/:id | Delete book from PG database |

### Comment 

| Method | Route | Functionality |
|--------| ------| --------------|
| Get | /comments/:commentId | Show specfic comment by id |
| Post | /comments/:bookId | Add comment to a specific book |
| Delete | /comments/:commentId | Delete comment by id |
| Put | /comments/:commentId | Edit comment by id |

### User

| Method | Route | Functionality |
| ------ | ------| --------------|
| Get | /users/search/:term | Searches through all users |
| Get | /users/check | Returns a single user using id associated with JWT token |
| Get | /users/:username | Returns a single user using given a username |
| Post | /users/signup | Signs user up, inserts info into PG database and creates a JWT token |
| Post | /users/login | Logs user in, checks to see if info matches the PG database, and creates a JWT token |
| Post | /users/follow/:id | Associates a user with another user via userId |
| Delete | /users/follow/:id | Remove user assocation with another user | 
