/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("questions").del();
  await knex("questions").insert([
    { question: "５０音の最初の文字を答えよ", answer: "あ", subject_id: 1 }, //1
    { question: "しんごうが青にかわった", answer: "あお", subject_id: 1 }, //2
    { question: "プールで耳にみずがはいる", answer: "みみ", subject_id: 1 }, //3
    { question: "かけっこで一ばんになった", answer: "いち", subject_id: 1 }, //4
    { question: "おとうさんの手はおおきい", answer: "て", subject_id: 1 }, //5
    { question: "車でおくってもらう", answer: "くるま", subject_id: 1 }, //6
    { question: "口をおおきくあける", answer: "くち", subject_id: 1 }, //7
    { question: "げきで王さまのやくになる", answer: "おう", subject_id: 1 }, //8
    { question: "森でかぶとむしをさがす", answer: "もり", subject_id: 1 }, //9
    { question: "あたらしい字をならう", answer: "じ", subject_id: 1 }, //10
    { question: "にわの花がきれいだ", answer: "はな", subject_id: 1 }, //11
    { question: "川でさかなつりをする", answer: "かわ", subject_id: 1 }, //12
    { question: "まいあさ七じにおきる", answer: "しち", subject_id: 1 }, //13
    { question: "虫をつかまえる", answer: "むし", subject_id: 1 }, //14
  ]);
};
