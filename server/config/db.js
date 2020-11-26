import mongoose from 'mongoose';

const mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
};

const connect = dbURL => {
  mongoose.connect(dbURL, mongooseConfig);
  const db = mongoose.connection;
  db.once('open', () =>
    console.log(`Database is connected on ${db.host}:${db.port}/${db.name}`),
  );
  db.on('close', () => console.log('Database is disconnected'));
};

export default connect;
