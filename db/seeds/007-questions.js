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
    { question: "愛知県", answer: "中部地方", subject_id: 1 }, //6
    { question: "東京都", answer: "関東地方", subject_id: 1 }, //7
    { question: "げきで王さまのやくになる", answer: "おう", subject_id: 1 }, //8
    { question: "森でかぶとむしをさがす", answer: "もり", subject_id: 1 }, //9
    { question: "あたらしい字をならう", answer: "じ", subject_id: 1 }, //10
    { question: "熊本県", answer: "九州地方", subject_id: 1 }, //11
    { question: "鳥取県", answer: "中国地方", subject_id: 1 }, //12
    { question: "北海道", answer: "北海道地方", subject_id: 1 }, //13
    { question: "福島県", answer: "東北地方", subject_id: 1 }, //14
  ]);
};
