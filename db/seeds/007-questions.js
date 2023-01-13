/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("questions").del();
  await knex("questions").insert([
    { question: "愛知県", answer: "中部地方", subject_id: 4 }, //1
    { question: "東京都", answer: "関東地方", subject_id: 4 }, //2
    { question: "熊本県", answer: "九州地方", subject_id: 4 }, //3
    { question: "鳥取県", answer: "中国地方", subject_id: 4 }, //4
    { question: "北海道", answer: "北海道地方", subject_id: 4 }, //5
    { question: "暑中みまい", answer: "しょちゅう", subject_id: 1 }, //
    { question: "身長をくらべる", answer: "しんちょう", subject_id: 1 }, //
    { question: "ぼくが打者だ", answer: "だしゃ", subject_id: 1 }, //
    { question: "きょうは調子がいい", answer: "ちょうし", subject_id: 1 }, //
    { question: "あすは祭日だ", answer: "さいじつ", subject_id: 2 }, //10
    { question: "1250  ÷ 50 =", answer: "25", subject_id: 1 }, //
    { question: "3 + 5 + 6 ÷ 2 =", answer: "11", subject_id: 2 }, //
    { question: "22 × 22 =", answer: "484", subject_id: 2 }, //
    { question: "55 × 4  =", answer: "220", subject_id: 2 }, //
    { question: "6 ÷ 2 + 3 × 2 =", answer: "9", subject_id: 2 }, //15
    { question: "animal  white  long ears", answer: "rabbit", subject_id: 5 }, //
    { question: "fruits  yellow  monkey", answer: "banana", subject_id: 5 }, //
    { question: "drink  white  cow", answer: "milk", subject_id: 5 }, //
    { question: "animal  big  long nose", answer: "elephant", subject_id: 5 }, //
    { question: "dig3  frightening  instructor", answer: "Eriko", subject_id: 5 }, //20

  ]);
};
