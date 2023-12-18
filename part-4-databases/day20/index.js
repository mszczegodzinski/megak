const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

(async () => {
  await client.connect();
  const db = client.db("megak_music");
  // find all songs:
  const songs = await db.collection("songs").find({}).toArray();
  console.log(songs);

  // find one song:
  const song = await db
    .collection("songs")
    .findOne({ _id: new ObjectId("657f1300cb2becfd67c677e5") });

  console.log("==================");
  console.log(song);

  // update one:
  const result = await db.collection("songs").updateOne(
    {
      _id: new ObjectId("657f1300cb2becfd67c677e5"),
    },
    {
      $set: {
        title: "updated_song_2",
      },
      $inc: {
        length: 10,
      },
    },
  );

  console.log("==================");
  console.log("updated: ", result);

  // close connection:
  await client.close();
})();
