## Release

The delivered MVP is available under the Git tag `v0.1.0`

## Project Overview

This is a web application functioning as a social network. The application allows users to register and remain completely anonymous: no username, no email, no password, nothing. Total anonymity. Inspired by 4chan and Reddit, it allows anonymous users to create discussion threads, comment under these threads, and browse threads based on location. Threads are organized by location, allowing each user (by selecting a city) to filter threads by city.

--- 
## Installation and Local Run

```
Clone the project:
git clone B-TBM-100-REN-1-1-yowl-1
cd B-TBM-100-REN-1-1-yowl-1/mvp
```

### Prerequisites

Make sure you have installed:
- Docker
- Docker Compose

### Environment Variables

The backend relies on the following environment variables:

```
MONGO_URI=mongodb://mongo:27017/poltergeistdb
JWT_SECRET= <a code secret>
IP_secret= <a code secret>
```

Now to this: 

```
cd backend/
docker cp world-cities.csv mvp-mongo-1:/world-cities.csv
```

Then, do :

```
cd ../
docker compose up --build
``` 

and in a other shell window , do : 

```
cd backend/
docker exec mvp-mongo-1 mongoimport \
  --db poltergeistdb \
  --collection Location \
  --type csv \
  --file /world-cities.csv \
  --headerline
```

### Running the Project

stop the current build docker compose you did before.
From the mvp/ directory, and rebuild and simply run:

```
docker compose up --build
```

Once running, the application is accessible at:
  - http://localhost:3001

---
### Justification of Technical Choices

  - React was chosen for its component-based architecture for an dynamic interface.
  - Express.js was chosen because it is really ideal for a simple REST Api
  - MongoDB has a flexible structure with flexible schemas, no SQL so it can be very simple for a simple mvp project, stores data as JSON-like documents which it is really close to what we send to frontend and frontend send to backend

---
## Prototype 

Link to the Figma pages : 
- Computer : 
	- https://www.figma.com/proto/OEcowloXSBYUQo7YhL5OER/poltergeist-design?node-id=524-3097&t=w1sveIcvoZkEgrYw-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=524%3A3097
- Mobile :
	- https://www.figma.com/proto/OEcowloXSBYUQo7YhL5OER/poltergeist-design?node-id=883-7058&t=kpquvZzO9wT9Mq2t-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=524%3A3097

--- 
## Folders Structure

```
.
|-- docs /
| |-- 01_ research /
| |-- 02_ personas /
| |-- 03_ user _ journey /
| |-- 04_ wireframes /
| |-- 05_ mockups /
| |-- 06_ prototype /
| |-- 07_ feedback /
| |-- 08_ prioritization /
| |-- 09_ pitch /
|-- mvp /
  |-- < source code of the web application >

```

--- 
## Commit Convention
```
Format of the commit message: KARMA GIT

  <type>(<scope>): <subject>
  <BLANK LINE>
  <body>

USEFUL <type> : 
  [FEAT] #For adding a new "feature" for the user.
  [FIX] #For fixing a "feature" relevant to the user.
  [RM] #For removing a "feature" relevant to the user.
  [REFACTOR] #For refactoring production code, e.g. renaming a variable.
  [DOCS] #For changes to the documentation/.md etc.
  [BUILD] #For updating build configuration, development tools or other changes irrelevant to the user.
  [TEST] #For adding missing tests, refactoring tests; no production code change.

USEFUL <scope>:
  - Init
  - Documentation (.md)
  - Deployment
  - Code development
  - Figma

```
