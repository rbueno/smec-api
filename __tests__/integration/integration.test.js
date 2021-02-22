require('dotenv').config();

const mongoose = require('mongoose');
const mongodbConfig = require('../../src/config/database/mongodb');
const User = require('../../src/models/User');
const Post = require('../../src/models/Post');

mongoose.connect(mongodbConfig[process.env.NODE_ENV], { useNewUrlParser: true, useUnifiedTopology: true })

const request = require('supertest');
const app = require('../../src/app');

let token;
let user;
let postId;

describe('Integration', () => {

  beforeAll(async () => {
    await User.deleteMany()
    await Post.deleteMany()
  });
  afterAll(async () => {
    await User.deleteMany();
    await Post.deleteMany();
    await mongoose.connection.close()
  });

  it('Create a new user', async () => {
    const res = await request(app)
      .post('/v1/user/create')
      .send({
        username: "rafaelbueno",
	      email: "rafaelbuenolink@gmail.com",
	      password: "12345678"
      })
      token = res.body.token;
      user = res.body.user;
      expect(res.body).toHaveProperty('user._id');
  })

  it('Should not create duplicate user a new user', async () => {
    const res = await request(app)
      .post('/v1/user/create')
      .send({
        username: "rafaelbueno",
	      email: "rafaelbuenolink@gmail.com",
	      password: "12345678"
      })

      expect(res.body).toHaveProperty('message');
  })

  it('Should list all users', async () => {
    const res = await request(app)
      .get('/v1/user/list')

      expect(res.body).toBeTruthy();
  })

  it('Should request authorization', async () => {
    const res = await request(app)
      .get('/v1/user/applysme')

      expect(res.statusCode).toBe(401);
  })

  it('Should be able to request to apply to becaome a SME if authenticated', async () => {
    const res = await request(app)
      .get('/v1/user/applysme')
      .set('Authorization', `Bearer ${token}`)

      expect(res.body).toHaveProperty('isApplicable');
  })

  it('Shouldnt allow not SME user to create new post', async () => {
    const res = await request(app)
      .post('/v1/post/sme/fetchURL')
      .set('Authorization', `Bearer ${token}`)
      .send({
        url:"https://www.youtube.com/watch?v=HzjHDsoHwB4&t=39s"
      })
      expect(res.statusCode).toBe(403);
  })

  it('Shouldnt allow not SME user to approve/stamp some post', async () => {
    const res = await request(app)
      .post('/v1/post/sme/stamp-it')
      .set('Authorization', `Bearer ${token}`)
      .send({
        postId:"123"
      })
      expect(res.statusCode).toBe(403);
  })

  it('Should approve a user to become SME', async () => {
    const res = await request(app)
      .post('/v1/admin/sme-allow')
      .send({ id: user._id })
      .set('Authorization', `Bearer ${token}`)

      token = res.body.token;
      expect(res.body).toHaveProperty('token');
  })

  it('Should allow SME user to create new post', async () => {
    const res = await request(app)
      .post('/v1/post/sme/fetchURL')
      .set('Authorization', `Bearer ${token}`)
      .send({
        url:"https://www.youtube.com/watch?v=HzjHDsoHwB4&t=39s"
      })
      postId = res.body._id;
      expect(res.body).toHaveProperty('_id');
  })

  it('Should not allow SME user to create a post that already exist', async () => {
    const res = await request(app)
      .post('/v1/post/sme/fetchURL')
      .set('Authorization', `Bearer ${token}`)
      .send({
        url:"https://www.youtube.com/watch?v=HzjHDsoHwB4&t=39s"
      })
      expect(res.body).toHaveProperty('result.data.alreadyPublished');
  })

  it('Should avoid user to approve/stamp same post more than once', async () => {
    const res = await request(app)
      .post('/v1/post/sme/stamp-it')
      .set('Authorization', `Bearer ${token}`)
      .send({
        postId,
      })
      expect(res.statusCode).toBe(403);
  })

  it('Should be able to remove stamp/post', async () => {
    const res = await request(app)
      .delete('/v1/post/sme/post-remove')
      .set('Authorization', `Bearer ${token}`)
      .send({
        postId,
      })
      expect(res.statusCode).toBe(200);
  })

})