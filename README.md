# SMEC-C REST API

Subject-Matter Experts Collection (SME-C) is an app where anyone who has a specialty in a given subject can share content they trust and approve. So we can all have access to cured content, where each content was selected by an expert in the respective subject.

## Built With

* [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express](https://expressjs.com/) - Express is a fast, unopinionated, minimalist web framework for Node.js
* [Mongoose](http://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js

## Endpoints /v1
* `GET /user/create`: To create new ordinary user account
* `GET /user/applysme`: To ordinary user request to become a SME
* `GET /admin/sme-requests`: To retrieve pending SME requests
* `GET /post/all`: All posts stamped
* `POST /admin/sme-allow`: To approve a SME request
* `POST /post/sme/fetchURL`: SME user can create a fetched web content post
* `POST /post/sme/stamp-it`: SME user can stamp/approve an existing post content
* `POST /post/sme/stamp-remove`: SME user can remove its stamp from an existing post content
* `POST /post/sme/post-remove`: SME user can remove a post since he/she hash the last stamp on that post
* `POST /session/login`: To ordinary or experts to create session

## Usage
```
yarn add
yarn test
yarn dev
```
