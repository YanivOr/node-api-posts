import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Posts } from '.'

const app = () => express(apiRoot, routes)

let posts

beforeEach(async () => {
  posts = await Posts.create({})
})

test('POST /posts 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test', content: 'test', tags: 'test', thumbnail: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(body.thumbnail).toEqual('test')
})

test('GET /posts 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /posts/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${posts.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(posts.id)
})

test('GET /posts/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /posts/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${posts.id}`)
    .send({ title: 'test', content: 'test', tags: 'test', thumbnail: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(posts.id)
  expect(body.title).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(body.thumbnail).toEqual('test')
})

test('PUT /posts/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ title: 'test', content: 'test', tags: 'test', thumbnail: 'test' })
  expect(status).toBe(404)
})

test('DELETE /posts/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${posts.id}`)
  expect(status).toBe(204)
})

test('DELETE /posts/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
