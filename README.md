# SMEC-C REST API

Subject-Matter Experts Collection (SME-C) is an app where anyone who has a specialty in a given subject can share content they trust and approve. So we can all have access to cured content, where each content was selected by an expert in the respective subject.

## Built With

* [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express](https://expressjs.com/) - Express is a fast, unopinionated, minimalist web framework for Node.js
* [Mongoose](http://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
* [JWT](https://jwt.io/) -  for representing claims securely
* [Jest](https://jestjs.io/en/) - A delightful JavaScript Testing Framework

## Endpoints /v1
* `GET /user/applysme`: To ordinary user request to become a SME
Response is a linkedin redirect url.
```
{
  "isApplicable": true,
  "url": "linkedin-api-url"
}
```
* `GET /admin/sme-requests`: To retrieve pending SME requests
response is a list with pending SME requests users ID
```
{
  _id: '123'
}
```
* `GET /post/all`: All posts stamped, to explore all contents.
* `POST /user/create`: To create a new ordinary user account
```
{
	"username": "rafaelbueno",
	"email": "rafaelbuenolink@gmail.com",
	"password": "12345678"
}
```
* `POST /admin/sme-allow`: To approve a SME request
Post user id order to allow it. For testing purpose, all ordinary users can use this endpoint. After approved, user needs to re-authenticate in order to get new token with new role.
POST ex.:
```
{
	"id":"123"
}
```
* `POST /post/sme/fetchURL`: SME user can create a fetched web content post
POST ex.:
```
{
	"url":"https://www.website.com/content"
}
```
* `PATCH /post/sme/stamp-it`: SME user can stamp/approve an existing post content
PATCH ex.:
```
{
	"postId":"123"
}
```
* `PATCH /post/sme/stamp-remove`: SME user can remove its stamp from an existing post content
PATCH ex.:
```
{
	"postId":"123"
}
```
* `DELETE /post/sme/post-remove`: SME user can remove a post since he/she hash the last stamp on that post
DELETE ex.:
```
{
	"postId":"6032e9497319716300007076"
}
```
* `POST /session/login`: To ordinary or SME users to create session
POST ex.:
```
{
	"email":"rafaelbuenolink9@gmail.com",
	"password":"12345678"
}
```

## Usage
```
yarn add
yarn test
yarn dev
```
## Api Example

* [Heroku](https://www.heroku.com/) - Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud
[https://smecollection.herokuapp.com/v1](https://smecollection.herokuapp.com/v1)