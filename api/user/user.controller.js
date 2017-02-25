// import something from db
import db from '../../database';
import Traveler from '../../database/models/travelers';

export function show(req, res) {
  const someDatabaseFxn = () => Promise.resolve();
  // someDatabaseFxn()
  //   .then(() => {
  //     res.status(200).json({ id: 123 });
  //   }).catch((err) => {
  //     console.log('err', err);
  //     res.status(400).json(err);
  //   });

  console.log("Hello")
}
