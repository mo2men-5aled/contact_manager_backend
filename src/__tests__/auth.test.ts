import request from 'supertest';
import app from '../app'; // your Express app

describe('Auth Routes', () => {
  it('should login successfully with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'user1', password: 'user1' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'user1', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
  });
});
