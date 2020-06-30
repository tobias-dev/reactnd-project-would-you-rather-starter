import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION_ANSWER,
  REMOVE_QUESTION_ANSWER,
} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION_ANSWER:
      return {
        ...state,
        [action.question.id]: {
          ...action.question,
          [action.answer]: {
            ...action.question[action.answer],
            votes: action.question[action.answer].votes.concat([action.uid]),
          },
        },
      };
    case REMOVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.question.id]: {
          ...action.question,
          [action.answer]: {
            ...action.question[action.answer],
            votes: action.question[action.answer].votes.filter(
              (a) => a !== action.uid
            ),
          },
        },
      };
    default:
      return state;
  }
}
