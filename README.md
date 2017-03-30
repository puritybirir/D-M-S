# CP2-DMS
[![Build Status](https://travis-ci.org/andela-pbirir/CP2-DMS.svg?branch=develop)](https://travis-ci.org/andela-pbirir/CP2-DMS)
[![Coverage Status](https://coveralls.io/repos/github/andela-pbirir/CP2-DMS/badge.svg?branch=develop)](https://coveralls.io/github/andela-pbirir/CP2-DMS?branch=develop)

# Document Managemet System
Document management system is a simple API used to track, manage and store documents.

Development
-----------
The application was developed with [NodeJs](http://nodejs.org) while using [Express](http://expressjs.com) for routing. The [Postgres](http://postgresql.com) database was used with [sequelize](http://sequelizejs.com) as the ORM

Installation
------------
Make sure that  you have [NodeJs](http://nodejs.org) and [Postgres](http://postgresql.com) installed
1.  Clone the repository
```
git@github.com:andela-pbirir/CP2-DMS.git

```
3.  Navigate to the directory.
4.  Install the project  dependencies using
```
npm install

```
5.  Run tests
```
npm test

```
6. create an environment file that will be read by the
project everytime it starts up by running and set the secret key and salt rounds
```
SECRET="coolSecret"
SALTROUNDS=10

```

## API ENDPOINTS
**Users**

Request      | Endpoint | Description
-------------| -------- | ------
POST | [/users/login](#login) | Logs a user in.
POST | [/users/logout](#logout) | Logs a user out.
POST | [/users](#create-users) |Creates a new user.
GET | [/users](#get-users) | Find matching instances of user.
GET | [/users/?limit={integer}&offset={integer}](#paginate-users)|Pagination for users.
GET | [/users/:id](#find-user) |  Find user.
PUT | [/users/:id](#update-user) | Update user attributes.
DELETE | [/users/:id](#delete-user) | Delete user.
GET | [/search/users/?q={username}](#search-for-user) | Search for a user.
POST | [/documents](#create-document) | Creates a new document instance.
GET | [/documents](#get-documents) | Find matching instances of document.
GET | [/documents/?limit={integer}&offset={integer}}](#paginate-docs)|Pagination for docs.
GET | [/documents/:id](#find-document) | Find document.
PUT | [/documents/:id](#update-document) | Update document attributes.
DELETE | [/documents/:id](#delete-document) | Delete document.
GET | [/users/:id/documents](#get-documents-by-user) | Find all documents belonging to the user.
GET | [/search/documents/?q={doctitle}}](#search-for-doc) | Search for a doc.
POST | [/role](#create-role) | Creates a new role
GET | [/roles/:id](#get-roles) | Finds one specific role
UPDATE | [/roles/:id](#get-roles) | Updates a role
GET | [/roles](#get-roles) | Lists all the roles
DELETE | [/roles/:id](#get-roles) | Deletes a specific role by id.
