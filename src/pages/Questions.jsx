import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mark from "../components/Mark";
import { questions } from "../data/copy";
import { useApp } from "../state";

export default function Questions() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const initial = useMemo(() => {
    const answered = questions.findIndex(
      (question) => !question.options.some((option) => state.answers.includes(option.id)),
    );
    if (answered === -1) return questions.length - 1;
    return answered;
  }, [state.answers]);
  const [step, setStep] = useState(initial);
  const question = questions[step];
  const selected = question.options.find((option) => state.answers.includes(option.id));

  function choose(id) {
    dispatch({ type: "answer", id });
  }

  function next() {
    if (!selected) return;
    if (step < questions.length - 1) setStep(step + 1);
    else navigate("/likes");
  }

  return (
    <main className="gate gate-quiz">
      <header className="gate-top">
        <Mark to="/" />
        <p className="kicker">
          {question.kicker} / 05
        </p>
      </header>
      <div className="quiz" key={question.id}>
        <div className="dots" aria-hidden="true">
          {questions.map((item, index) => (
            <span key={item.id} className={index <= step ? "on" : ""} />
          ))}
        </div>
        <h1>{question.prompt}</h1>
        <div className="options" role="listbox" aria-label={question.prompt}>
          {question.options.map((option) => {
            const on = selected?.id === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={on}
                className={on ? "option on" : "option"}
                onClick={() => choose(option.id)}
              >
                <span className="option-mark" aria-hidden="true" />
                {option.label}
              </button>
            );
          })}
        </div>
        <div className="quiz-nav">
          {step > 0 ? (
            <button type="button" className="text-link" onClick={() => setStep(step - 1)}>
              Back
            </button>
          ) : (
            <Link to="/" className="text-link">
              Back
            </Link>
          )}
          <button type="button" className="solid" disabled={!selected} onClick={next}>
            {step === questions.length - 1 ? "Choose five places" : "Next"}
          </button>
        </div>
      </div>
    </main>
  );
}
