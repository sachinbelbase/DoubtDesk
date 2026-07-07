export function getQuestionStats(questions, answers) {
  const answeredIds = new Set(answers.map((a) => a.questionId));
  const answeredCount = questions.filter((q) => answeredIds.has(q.id)).length;

  return {
    total: questions.length,
    answered: answeredCount,
    pending: questions.length - answeredCount,
  };
}

export function getPendingQuestions(questions, answers) {
  const answeredIds = new Set(answers.map((a) => a.questionId));
  return questions.filter((q) => !answeredIds.has(q.id));
}
