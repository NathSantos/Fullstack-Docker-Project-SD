module.exports = {
  async up(db, client) {
    await db
      .collection("paises")
      .insertMany([
        { title: "Brasil" },
        { title: "Turquia" },
        { title: "Japão" },
        { title: "Inglaterra" },
      ]);
  },

  async down(db, client) {
    await db.collection("paises").deleteMany({
      title: {
        $in: ["Brasil", "Turquia", "Japão", "Inglaterra"],
      },
    });
  },
};
