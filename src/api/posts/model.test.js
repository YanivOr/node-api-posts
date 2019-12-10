import { Posts } from '.'

let posts

beforeEach(async () => {
  posts = await Posts.create({ title: 'test', content: 'test', tags: 'test', thumbnail: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = posts.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(posts.id)
    expect(view.title).toBe(posts.title)
    expect(view.content).toBe(posts.content)
    expect(view.tags).toBe(posts.tags)
    expect(view.thumbnail).toBe(posts.thumbnail)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = posts.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(posts.id)
    expect(view.title).toBe(posts.title)
    expect(view.content).toBe(posts.content)
    expect(view.tags).toBe(posts.tags)
    expect(view.thumbnail).toBe(posts.thumbnail)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
