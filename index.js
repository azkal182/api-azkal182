// CommonJs
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
 console.log(request)
  return { hello: 'world' }
})
fastify.get('/lk21/search', async (request, reply) => {
 console.log(request.query)
 request.log.info('some info')
  return { query : request.query}
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
