const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/api/v1/appliance/:id/info', (req, res) => {
  const { id } = req.params;
  console.log(`Received request for appliance with serial number: ${id}`);
  const db = router.db;
  console.log(JSON.stringify(db), 'DB');
  const appliance = db.get('appliances').find({ serialNo: id }).value();

  if (appliance) {
    res.status(200).json(appliance);
  } else {
    res.status(404).json({ error: 'Appliance not found' });
  }
});

server.use('/api/v1', router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
