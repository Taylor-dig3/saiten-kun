require("dotenv").config();
const { response } = require("express");
const express = require("express");
const { readOnlySelector } = require("recoil");
//knexをrequire

const app = express();
// const PORT = process.env.PORT || 3001;

app.use(express.json());

const setupServerMock = () => {
  app.post("/loginMock", (req, res) => {
    console.log("loginMock");
    if (req.body.login_id === 1) {
      const response = {
        user_id: 1,
        name: "田中　花子",
        login_state: "studentLogin",
      };
    } else if (req.body.login_id === 2) {
      const response = {
        user_id: 2,
        name: "田中　花子",
        login_state: "teacherLogin",
      };
    } else {
      const response = {
        user_id: null,
        name: null,
        login_state: "notYetLoggedIn",
      };
    }
    res.send(response).status(200).end();
  });

  app.get("/questionMock", (req, res) => {
    console.log("questionMock");
    const response = {
      question_title: "漢字をひらがなに直しなさい",
      data: [
        {
          question_id: 1,
          question: "草がはえる",
          answer: "くさ",
        },
        {
          question_id: 2,
          question: "歯がぬけた",
          answer: "は",
        },
        {
          question_id: 3,
          question: "親しらず",
          answer: "おや",
        },
      ],
    };
    console.log("questionMock2");
    res.send(response).status(200).end();
  });

  app.get("/testsMock", (req, res) => {
    console.log("testsMock");
    const testTable = [
      {
        test_id: 1,
        title: "国語小テスト1",
        grade: 5,
        subject: "国語",
        question_number: 3,
        test_date: "2022-12-14",
      },
      {
        test_id: 2,
        title: "国語小テスト1",
        grade: 5,
        subject: "国語",
        question_number: 4,
        test_date: "2022-12-30",
      },
    ];
    res.send(testTable).status(200).end();
  });

  app.post("/answerMock", (req, res) => {
    res.status(200).end();
  });

  app.get("/answerMock", (req, res) => {
    console.log("answerMock");
    const resultTable = {
      question_title: "漢字をひらがなに直しなさい",
      data: [
        {
          question: "草がはえる",
          answer_img:
            "iVBORw0KGgoAAAANSUhEUgAAAZoAAACxCAYAAAD9GnsiAAABV2lDQ1BJQ0MgUHJvZmlsZQAAGJV1kL9LQmEUhh/LEkpIKmhpcHAosCgN2gIzqMBBtMgaguvVNFC7XA1xa4xoC4KghpagJSIIaaqhf6AfFBStDQ0tgUvJ7Vyt1KIDL+/Dy8v3HQ40oWhaygqkMzk9NDnujMwvOG3P2OmglU4ciprVfMFgQCp8e+OU7rCYfjNgvvV4khk+X1vMX0denna2rlr/9humLRbPquIfoj5V03NgcQkH8znNZBHduiwlvG5yosq7JkerfFzpzIT8wpfCDjWpxIRvhd3RujxRx+nUqvq1g7m9PZ6ZDZsu6iWMh1G8TBH4pzdS6flZQaOAzjIJkuRw4pNEI0VceJoMKoO4hT0MiTzmfX/frZYVDmFsT77aqGWRfTiagJ7TWubahC7hs1dN0ZWfa1pK1uyS11Pl9iK0bBvG2xzY+qF8bxjvRcMoH0DzA1yUPgHdFWOhc/vkRAAAAFZlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA5KGAAcAAAASAAAARKACAAQAAAABAAABmqADAAQAAAABAAAAsQAAAABBU0NJSQAAAFNjcmVlbnNob3SsMvAXAAAB1mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xNzc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NDEwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6VXNlckNvbW1lbnQ+U2NyZWVuc2hvdDwvZXhpZjpVc2VyQ29tbWVudD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiEoLeQAACj3SURBVHgB7Z0H3BTF3ceHjhRRBAQ1EYQkohhBUGIDbIkItqgoNiAmgphYI4iiYKPYG4L9tVGMEBHhTWIUJAo2BAXRiEYlgthNQESa73yHd5/P8XBl93b3bp/lN37O57jbnfKbvfnNv061H2wxKkJACAgBISAEYkKgekz1qlohIASEgBAQAg4BEY0eBCEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2eASEgBISAEIgVARFNrPCqciEgBISAEBDR6BkQAkJACAiBWBEQ0cQKryoXAkJACAgBEY2egbIj8Mknn5i77rqr7P0oZQdWrFhhZs2aVcom1ZYQKBsCIpqyQa+GQWD58uVm9OjRpn379lsVIC/84x9m8eLFW9WYNditFwERzdY792Uf+YYNGxzJHHHEEeaAAw4oe3/8dmDSpMfN/Pnz/V6e9br5CxaYE044Iet3+lAIpA0BEU3aZrSKjOe///2vGTRokOnQoYPp0aNHFen1pm62atnSPPXUU0X3+cMPPzTr1683O+64Y9F16EYhUJUQENGUcbawTWyN5T//+Y8ZOXKkadq0qTnjjDOqHAS7ttzVvPPOO+bLL74I3PcffvjB/OlPfzJ77rln4Ht1gxCoqgiIaMo4c9ddd10ZWy9f0zffdLNBorngggtMjRo1yteRIltu1qyZ2WabbYqysTDuN998c6uzSRUJtW5LCQIimjJOZP369c0333xTxh6Utunvv//eXHvttearr78ykGzdunVL24GIWqtWrZrp3r27ee21eYFrfO+99wz3t23bNvC9mTe8/fbb5tNPPzVISCpCIOkI1Ex6B9Pcv9q1azsVzC9+8Ys0D9ONbePGjWbKlCluNz98+HCz3XbbVekxH3PMMeY3v/mNwaEhiFQ2adIk0+Ooo0ytWrVCjf+RRx4xn33+mVm/br3ZaaedzK677mr22GMPs8MOOzhsGzduXGWJPBQwujmRCIhoyjgtDRs2NMuWLStjD0rX9IzpM8yECRPMrbfeanbbbbdADb/xxhvm/fffN8cff7yTBgLdHNPFderUMczfCy+8YLp27eqrFaQQXhdddJGv6/NdhES4bt06R3SrVq0yzz//vJk2bZpZtGiRqV69uqlZs5bZd99OTvLaZ5998lWl74RA7AiIaGKHOHcD22+/vXn33XdzX5CSb1Dx3P/A/aZXr16mVatWgUcFTq+88or5h4096dOnT2LsGz/+8Y/NM88845to5syZY1rs1MJKHY0DY1D5BtRvSMQU7EUnnniieyFhffTRRwbPNjYxd999t/n666/N4Ycfbk4//XRTr169ylXp30IgdgRko4kd4twNoD7517/+lfuCFHyDXWbYsGFOimGhY4EMWljQ2cG3a9fOXHPNNWaszSLwRREeX0HbLXQ9QaYs6GvWrCl0qVm9erV57rnnTK+Telm12SaCKHhTERegxkNiPPTQQ51H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",
          result: true,
        },
        {
          question: "歯がぬけた",
          answer_img: "logo192.png",
          result: false,
        },
        {
          question: "親しらず",
          answer_img: "logo192.png",
          result: false,
        },
      ],
    };
    res.send(resultTable).status(200).end();
  });

  // app.post("/students",())

  // app.get("/testsMock", (req, res) => {
  //   console.log("testsMock");
  //   const testsTable = [
  //     {
  //       test_id: 1,
  //       title: "算数小テスト1",
  //       made_date: "2022-12-01",
  //       question_number: 3,
  //       test_date: "2022-12-14",
  //     },
  //     {
  //       test_id: 2,
  //       title: "算数小テスト2",
  //       made_date: "2022-12-01",
  //       question_number: 10,
  //       test_date: "2022-12-14",
  //     },
  //   ];
  //   res.send(testsTable);
  // });

  // app.get("/questionsMock/:test_id", (req, res) => {
  //   if (Number(req.params.test_id) !== NaN) {
  //     const questionTable = [
  //       {
  //         question_id: 1,
  //         question: "1+1は？",
  //         answer: "2",
  //       },
  //     ];
  //     res.send(questionTable);
  //   } else if (req.params.test_id === undefined) {
  //     const questionTable = [
  //       {
  //         question_id: 1,
  //         question: "1+1は？",
  //         answer: "2",
  //       },
  //       {
  //         question_id: 2,
  //         question: "1+2は？",
  //         answer: "3",
  //       },
  //     ];
  //     res.send(questionTable);
  //   } else {
  //     res.status(404).json({ error: "message" });
  //   }
  // });

  // app.post("/questionsMock", (req, res) => {
  //   console.log("POST:questionsMock", req.body);
  // });

  // app.put("/testsMock", (req, res) => {
  //   res.send(2);
  //   console.log("PUT:tests.Mock", req.body);
  // });

  return app;
};

module.exports = { setupServerMock };
