const { config } = require('dotenv');
const { MongoClient } = require('mongodb');
require('dotenv/config');

const uri = process.env.MongoDB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
  const collection = client.db("world").collection("city");
  // Insert a new CITY
  await collection.insertOne({
    Name: 'Lattakia',
    CountryCode: 'SYR',
    District: 'Lattakia'
  });
  // Update Population inside the created document
  await collection.updateOne({ Name: 'Lattakia' },
    { $set: { Population: 1453000 }});
  // Find document by cityname
  const cityInfo = collection.find({ Name: 'Lattakia' });
  console.log(cityInfo);
  // Find document by countryCode
  const cityInfo_2 = collection.find({ countryCode: 'SYR' });
  console.log(cityInfo_2);
  // Delete the city
  await collection.deleteOne({ Name: 'Lattakia' });
  client.close();
});