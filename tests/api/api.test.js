
import request from 'supertest';
import app from '../../server/index.js';

describe('API Tests', () => {
  it('POST /login should succeed', async () => {
    const res = await request(app).post('/login').send({ username: 'test', password: '123' });
    expect(res.statusCode).toBe(200);
  });

  it('POST /login should fail with bad credentials', async () => {
    const res = await request(app).post('/login').send({ username: 'x', password: 'y' });
    expect(res.statusCode).toBe(401);
  });

  it('CRUD /items', async () => {
    const create = await request(app).post('/items').send({ text: 'New Item' });
    expect(create.statusCode).toBe(201);

    const id = create.body.id;
    const get = await request(app).get('/items');
    expect(get.body).toEqual(expect.arrayContaining([{ id, text: 'New Item' }]));

    const update = await request(app).put(`/items/${id}`).send({ text: 'Updated Item' });
    expect(update.body.text).toBe('Updated Item');

    const del = await request(app).delete(`/items/${id}`);
    expect(del.statusCode).toBe(204);
  });
});
