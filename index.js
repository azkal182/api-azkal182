
import { lk21Popular, lk21Search, lk21Latest } from './lib/lk21.js'
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
 console.log(request)
  return { hello: 'world' }
})
fastify.get('/lk21/search', async (request, reply) => {
 const query = request.query.id
 const tmdb = request.query.tmdb
 //request.log.info('some info')
 const result = await lk21Search(query, tmdb)
  return result
})

fastify.get('/lk21/latest', async (request, reply) => {
 const result = await lk21Latest()
  return result
})

fastify.get('/lk21/popular', async (request, reply) => {
 const result = await lk21Popular(request.query.tmdb ?request.query.tmdb: null )
  return result
})


fastify.get('/users/:id', (request, reply) => {
  // Mengambil nilai parameter id
  const id = request.params.id
  // Mengembalikan response ke client
  reply.send({ id: id })
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 4000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
