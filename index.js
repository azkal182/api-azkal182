

const Fastify = require('fastify')
const { FieldValue } = require("firebase-admin/firestore");
const port = 8383;
const { db } = require("./firebase.js");
const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
 console.log(request)
  return { hello: 'world' }
})
/*
fastify.get('/lk21/search', async (request, reply) => {
 const query = request.query.id
 const tmdb = request.query.tmdb
 //request.log.info('some info')
 const result = await lk21Search(query, tmdb)
  return result
})
*/

fastify.get('/api/series/latest', async (request, reply) => {
 const peopleRef = db.collection("series");
 const snapshot = await peopleRef.limit(20).get();
 const data = [];
 snapshot.forEach((doc) => {
  //console.log(doc.id, "=>", doc.data());
  const oke = doc.data();
  data.push({ ...oke });
 });
  return data
})

fastify.get('/api/series/popular', async (request, reply) => {
 const peopleRef = db.collection("series");
 const snapshot = await peopleRef.orderBy('reviewCount').limit(20).get();
 const data = [];
 snapshot.forEach((doc) => {
  //console.log(doc.id, "=>", doc.data());
  const oke = doc.data();
  data.push({ ...oke });
 });
  return data
})

fastify.get('/api/series/drama', async (request, reply) => {
 const citiesRef = db.collection('series');
const snapshot = await citiesRef.where("categories", "array-contains-any",["Drama"]).limit(20).get();

if (snapshot.empty) {
  console.log('No matching documents.');
  return;
}  
const data = []

snapshot.forEach(doc => {
 data.push({...doc.data()})
  console.log(doc.id, '=>', doc.data());
});

return data
 
})

fastify.get('/api/series/korea', async (request, reply) => {
 const citiesRef = db.collection('series');
const snapshot = await citiesRef.where("categories", "array-contains-any",["Korea", "South Korea"]).limit(20).get();

if (snapshot.empty) {
  console.log('No matching documents.');
  return;
}  
const data = []

snapshot.forEach(doc => {
 data.push({...doc.data()})
  console.log(doc.id, '=>', doc.data());
});

return data
 
})

fastify.get('/api/series/china', async (request, reply) => {
 
 const citiesRef = db.collection('series');
const snapshot = await citiesRef.where("categories", "array-contains-any",["China"]).limit(20).get();

if (snapshot.empty) {
  console.log('No matching documents.');
  return;
}  
const data = []

snapshot.forEach(doc => {
 data.push({...doc.data()})
  console.log(doc.id, '=>', doc.data());
});

return data
 
})

fastify.get('/api/series/asian', async (request, reply) => {
 const citiesRef = db.collection('series');
const snapshot = await citiesRef.where("categories", "array-contains-any",["Asian"]).limit(20).get();

if (snapshot.empty) {
  console.log('No matching documents.');
  return;
}  
const data = []

snapshot.forEach(doc => {
 data.push({...doc.data()})
  console.log(doc.id, '=>', doc.data());
});

return data
})

fastify.get('/api/series/west', async (request, reply) => {
 const citiesRef = db.collection('series');
const snapshot = await citiesRef.where("categories", "array-contains-any",["West"]).limit(20).get();

if (snapshot.empty) {
  console.log('No matching documents.');
  return;
}  
const data = []

snapshot.forEach(doc => {
 data.push({...doc.data()})
  console.log(doc.id, '=>', doc.data());
});
return data
})


fastify.get('/api/series/detail/:id', async (request, reply) => {
 
const query = request.params.id

 const peopleRef = db.collection("detail");
 const snapshot = await peopleRef.where('id' , '==', query).get();
 const data = [];
 snapshot.forEach((doc) => {
  console.log(doc.id, "=>", doc.data());
  const oke = doc.data();
  data.push({ ...oke });
 })
 
 return data
 
})


/*
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
*/
/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 8383 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
