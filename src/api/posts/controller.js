import { success, notFound } from '../../services/response/'
import { Posts } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Posts.create(body)
    .then((posts) => posts.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Posts.countDocuments(query)
    .then(count => Posts.find(query, select, cursor)
      .then((posts) => ({
        count,
        rows: posts.map((posts) => posts.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Posts.findById(params.id)
    .then(notFound(res))
    .then((posts) => posts ? posts.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Posts.findById(params.id)
    .then(notFound(res))
    .then((posts) => posts ? Object.assign(posts, body).save() : null)
    .then((posts) => posts ? posts.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Posts.findById(params.id)
    .then(notFound(res))
    .then((posts) => posts ? posts.remove() : null)
    .then(success(res, 204))
    .catch(next)
