/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("questions").del();
  await knex("questions").insert([
    { question: "５０音の最初の文字を答えよ", answer: "あ" },
    { question: "しんごうが青にかわった", answer: "あお" },
    { question: "プールで耳にみずがはいる", answer: "みみ" },
    { question: "かけっこで一ばんになった", answer: "いち" },
    { question: "おとうさんの手はおおきい", answer: "て" },
    { question: "車でおくってもらう", answer: "くるま" },
    { question: "口をおおきくあける", answer: "くち" },
    { question: "げきで王さまのやくになる", answer: "おう" },
    { question: "森でかぶとむしをさがす", answer: "もり" },
    { question: "あたらしい字をならう", answer: "じ" },
    { question: "にわの花がきれいだ", answer: "はな" },
    { question: "川でさかなつりをする", answer: "かわ" },
    { question: "まいあさ七じにおきる", answer: "しち" },
    { question: "虫をつかまえる", answer: "むし" },
  ]);
};
