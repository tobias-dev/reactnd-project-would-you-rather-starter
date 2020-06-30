export function getQuestionStats(question, uid) {
  const optionOne = question.optionOne;
  const optionTwo = question.optionTwo;
  const optionOneVotes = optionOne.votes.length;
  const optionTwoVotes = optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  return {
    optionOne: {
      text: optionOne.text,
      votes: optionOneVotes,
      percentage: parseInt((optionOneVotes * 100) / totalVotes),
    },
    optionTwo: {
      text: optionTwo.text,
      votes: optionTwoVotes,
      percentage: parseInt((optionTwoVotes * 100) / totalVotes),
    },
    totalVotes,
    userAnswer: optionOne.votes.includes(uid) ? 'optionOne' : 'optionTwo',
  };
}
