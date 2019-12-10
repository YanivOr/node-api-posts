import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Posts, { schema } from './model'

const router = new Router()
const { title, content, tags, thumbnail } = schema.tree

/**
 * @api {post} /posts Create posts
 * @apiName CreatePosts
 * @apiGroup Posts
 * @apiParam title Posts's title.
 * @apiParam content Posts's content.
 * @apiParam tags Posts's tags.
 * @apiParam thumbnail Posts's thumbnail.
 * @apiSuccess {Object} posts Posts's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Posts not found.
 */
router.post('/',
  body({ title, content, tags, thumbnail }),
  create)

/**
 * @api {get} /posts Retrieve posts
 * @apiName RetrievePosts
 * @apiGroup Posts
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of posts.
 * @apiSuccess {Object[]} rows List of posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /posts/:id Retrieve posts
 * @apiName RetrievePosts
 * @apiGroup Posts
 * @apiSuccess {Object} posts Posts's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Posts not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /posts/:id Update posts
 * @apiName UpdatePosts
 * @apiGroup Posts
 * @apiParam title Posts's title.
 * @apiParam content Posts's content.
 * @apiParam tags Posts's tags.
 * @apiParam thumbnail Posts's thumbnail.
 * @apiSuccess {Object} posts Posts's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Posts not found.
 */
router.put('/:id',
  body({ title, content, tags, thumbnail }),
  update)

/**
 * @api {delete} /posts/:id Delete posts
 * @apiName DeletePosts
 * @apiGroup Posts
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Posts not found.
 */
router.delete('/:id',
  destroy)

export default router
