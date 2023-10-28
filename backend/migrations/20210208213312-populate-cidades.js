module.exports = {
  async up(db, client) {
    await db
      .collection("cidades")
      .insertMany([
        { title: "Manaus" },
        { title: "São Paulo" },
        { title: "Toronto" },
        { title: "Londres" },
      ]);
  },

  async down(db, client) {
    await db.collection("cidades").deleteMany({
      title: {
        $in: ["Manaus", "São Paulo", "Toronto", "Londres"],
      },
    });
  },
};
