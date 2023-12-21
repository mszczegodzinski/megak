/**
 * Exercises:
 * Repeat all exercises which was done in MongoDB shell:
 * 1. add megak_music2 database
 * 2. add 'songs' collection
 * 3. add few songs. Every song should contains title, artist, and length in seconds
 * 4. Find and display all songs
 * 5. Find songs using artist
 * 6. add artist collection
 * 7. add three artists. Every artist has name, and started date
 * 8. Delete artist field from each song from songs collection
 * 9. Delete artist from artists collection who started playing more than 20 years ago
 */

const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

(async () => {
  await client.connect();

  // 1:
  const db = client.db("megak_music2");

  // 2:
  await db.createCollection("songs");

  // 3:
  const songs = [
    {
      title: "Title 1",
      artist: "artist 1",
      length: 230,
    },
    {
      title: "Title 2",
      artist: "artist 2",
      length: 300,
    },
    {
      title: "Title 3",
      artist: "artist 3",
      length: 310,
    },
  ];

  await db.collection("songs").insertMany(songs);

  // 4:
  console.log("all songs: ");
  for await (const song of db.collection("songs").find()) {
    console.log(song);
  }

  // 5:
  for await (const song of db
    .collection("songs")
    .find({ artist: "artist 1" })) {
    console.log("all songs by artist: ");
    console.log(song);
  }

  // 6 & 7:
  const artists = [
    {
      name: "artist 1",
      startedAt: new Date("2010-01-01 12:00"),
    },
    {
      name: "artist 2",
      startedAt: new Date("2001-01-01 12:00"),
    },
    {
      name: "artist 3",
      startedAt: new Date("2015-01-01 12:00"),
    },
  ];

  await db.collection("artists").insertMany(artists);

  // 8:
  await db.collection("songs").updateMany(
    {},
    {
      $unset: {
        artist: "",
      },
    },
  );

  // 9:
  await db.collection("artists").deleteMany({
    startedAt: {
      $lt: new Date("2003-01-01 12:00"),
    },
  });

  // close connection:
  await client.close();
})();
