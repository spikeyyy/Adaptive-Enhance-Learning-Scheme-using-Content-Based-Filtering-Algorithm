import React, { useState, useEffect } from "react";
import axios from "axios";
import { AUTH_API_URL } from "../../../../../api/loginAuth";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const MAX_QUESTIONS = 20;
const TOTAL_TIME = 20;

interface Question {
  id: string;
  question: string;
  options: Option;
  correct_answer: string;
}

interface Option {
  [key: string]: string;
}

interface QuestionsData {
  [category: string]: Question[];
}

interface ProgressBarProps {
  timeLeft: number;
}

interface SelectedOptions {
  [questionId: string]: {
    selectedAnswer: string;
    isCorrect: boolean;
  };
}

const Prognostic_Questions = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const [categoryScores, setCategoryScores] = useState<{
    [key: string]: { correct: number; incorrect: number };
  }>({});

  const [modules, setModules] = useState({});
  const [firstName, setFirstName] = useState(""); // Add state for first name
  const [surname, setSurname] = useState(""); // Add state for surname
  const [program, setProgram] = useState(""); // Add state for program
  const [studentId, setStudentId] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<QuestionsData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] =
    useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [temporarySelection, setTemporarySelection] = useState<string | null>(
    null
  );
  const [scores, setScores] = useState(null);

  const flaskApiUrl = AUTH_API_URL + "/get_questions";

  // useEffect(() => {
  //   setTimeLeft(TOTAL_TIME);
  //   setTimerActive(true);

  //   const interval = setInterval(() => {
  //     setTimeLeft((prevTime) => {
  //       if (prevTime === 1) {
  //         setTimerActive(false);
  //         clearInterval(interval);

  //         handleNext();
  //       }
  //       return prevTime - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [currentQuestionIndex, currentCategory]);

  // Fetch Modules after getting studentId
  useEffect(() => {
    if (studentId) {
      axios
        .get(`${AUTH_API_URL}/get_student_modules`, {
          params: { student_id: studentId },
        })
        .then((response) => {
          console.log("Modules:", response.data.modules);
          setModules(response.data.modules);
        })
        .catch((error) => {
          console.error("Error fetching modules:", error);
          // Handle error appropriately
        });
    }
  }, [studentId]);

  useEffect(() => {
    const currentQuestionId =
      questions[currentCategory]?.[currentQuestionIndex]?.id;
    setIsCurrentQuestionAnswered(!!selectedOptions[currentQuestionId]);
  }, [currentQuestionIndex, currentCategory, selectedOptions, questions]);

  useEffect(() => {
    axios
      .get<QuestionsData>(flaskApiUrl)
      .then((response) => {
        console.log("API Response:", response.data);
        setQuestions(response.data);
        setCurrentCategory(Object.keys(response.data)[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const ModulesDisplay = () => {
    return (
      <div className="mb-8 overflow-auto">
        {" "}
        {/* Ensuring the main container can handle overflow */}
        <h2 className="mb-6">Modules</h2>
        {Object.entries(modules).map(([category, moduleDetails], index) => (
          <div
            className="mb-6 pb-4 border-b border-gray-200 overflow-auto"
            key={index}
          >
            {" "}
            {/* Applying overflow-auto */}
            <h3 className="text-lg font-semibold mb-4">
              Name of Category: {category}
            </h3>
            {typeof moduleDetails === "object" && moduleDetails !== null ? (
              Object.entries(moduleDetails).map(
                ([moduleName, moduleInfo], subIndex) => (
                  <div className="mb-4 overflow-visible" key={subIndex}>
                    {" "}
                    {/* Adjusting overflow here if needed */}
                    <h4 className="font-medium mb-2">Title: {moduleName}</h4>
                    {typeof moduleInfo === "object" && moduleInfo !== null ? (
                      <ul className="list-disc pl-6 overflow-auto">
                        {" "}
                        {/* Ensuring content can scroll */}
                        {Object.entries(moduleInfo).map(
                          ([key, value], detailIndex) => (
                            <li className="mb-1" key={detailIndex}>
                              <strong>{key}:</strong>{" "}
                              {typeof value === "string"
                                ? value
                                : JSON.stringify(value)}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p>Invalid module info</p>
                    )}
                  </div>
                )
              )
            ) : (
              <p>Invalid module details</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const fetchStudentId = async () => {
    try {
      const response = await axios.get(AUTH_API_URL + "/query_student_id", {
        params: { first_name: firstName, surname: surname, program: program },
      });
      setStudentId(response.data.student_ids[0]);
    } catch (error) {
      console.error("Error fetching student ID:", error);
    }
  };

  useEffect(() => {
    // Fetch student ID on component mount
    fetchStudentId();
  }, [firstName, surname, program]);

  const categories = Object.keys(questions);

  {
    /*timer */
  }
  const ProgressBar: React.FC<ProgressBarProps> = ({ timeLeft }) => {
    const percentage = (timeLeft / TOTAL_TIME) * 100;
    return (
      <div
        className="progress-bar-container"
        style={{ width: "100%", backgroundColor: "#ddd" }}
      >
        <div
          style={{
            height: "10px",
            width: `${percentage}%`,
            backgroundColor: "green",
          }}
        ></div>
      </div>
    );
  };

  const findQuestionById = (id: string) => {
    for (const category of Object.values(questions)) {
      const question = category.find((q) => q.id === id);
      if (question) {
        return question;
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    const { formattedAnswers, scoreSummary } = formatAnswersForSubmission();

    try {
      const response = await axios.post(AUTH_API_URL + "/submit_exam", {
        student_id: studentId,
        answers: formattedAnswers,
        score_summary: scoreSummary,
      });

      if (response.status === 200) {
        // Assuming 200 is the success status code
        console.log("Exam submitted successfully");
        setShowConfetti(true);
        setShowSuccessMessage(true);

        setTimeout(() => {
          // setShowSuccessMessage(false);
          // setShowConfetti(false);
          // Redirect or perform some action after submission
        }, 7000); // Adjust timeout as needed
      } else {
        // handle non-successful response
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      // handle error
    }
  };

  const formatAnswersForSubmission = () => {
    const formattedAnswers = [];
    const scoreSummary = [];

    // Explicitly define the type of questions here, based on your existing types
    const questionsData: QuestionsData = questions;

    for (const [category, questionsInCategory] of Object.entries(
      questionsData
    )) {
      let correctCount = 0;
      let incorrectCount = 0;

      for (const question of questionsInCategory) {
        const answerObject = selectedOptions[question.id];
        if (answerObject) {
          const isCorrect =
            question.correct_answer === answerObject.selectedAnswer;
          formattedAnswers.push({
            questionId: question.id,
            answer: answerObject.selectedAnswer,
            isCorrect,
          });

          if (isCorrect) correctCount++;
          else incorrectCount++;
        }
      }

      scoreSummary.push({
        category: category,
        correct: correctCount,
        incorrect: incorrectCount,
      });
    }

    console.log("Formatted Answers for Submission:", formattedAnswers);
    console.log("Score Summary:", scoreSummary);

    return { formattedAnswers, scoreSummary };
  };

  const isLastQuestion = () => {
    const currentCategoryIndex = categories.indexOf(currentCategory);
    return (
      currentQuestionIndex === questions[currentCategory].length - 1 &&
      currentCategoryIndex === categories.length - 1
    );
  };

  const handleOptionClick = (questionId: string, optionKey: string) => {
    const currentQuestion = findQuestionById(questionId);
    if (currentQuestion) {
      const isCorrect = currentQuestion.correct_answer === optionKey;

      // Update selected answer and correctness
      setSelectedOptions((prev) => ({
        ...prev,
        [questionId]: { selectedAnswer: optionKey, isCorrect },
      }));

      // Update category scores
      setCategoryScores((prevScores) => {
        const currentScores = prevScores[currentCategory] || {
          correct: 0,
          incorrect: 0,
        };
        if (isCorrect) {
          // Increment correct count
          return {
            ...prevScores,
            [currentCategory]: {
              ...currentScores,
              correct: currentScores.correct + 1,
            },
          };
        } else {
          // Increment incorrect count
          return {
            ...prevScores,
            [currentCategory]: {
              ...currentScores,
              incorrect: currentScores.incorrect + 1,
            },
          };
        }
      });
    }
  };

  // useEffect to log categoryScores when it updates
  useEffect(() => {
    console.log("Updated Category Scores:", categoryScores);
  }, [categoryScores]);

  const handlePrevious = () => {
    const currentQuestionId =
      questions[currentCategory]?.[currentQuestionIndex]?.id;
    const currentQuestion = findQuestionById(currentQuestionId);

    if (temporarySelection && currentQuestion) {
      const isCorrect = currentQuestion.correct_answer === temporarySelection;
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [currentQuestionId]: { selectedAnswer: temporarySelection, isCorrect },
      }));
    }
    setTemporarySelection(null); // Reset temporarySelection

    // Logic to navigate to the previous question
    if (currentQuestionIndex > 0) {
      // Move to the previous question in the current category
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else {
      // Move to the previous category
      const currentCategoryIndex = categories.indexOf(currentCategory);
      if (currentCategoryIndex > 0) {
        const prevCategory = categories[currentCategoryIndex - 1];
        setCurrentCategory(prevCategory);
        // Set index to the last question of the previous category
        setCurrentQuestionIndex(questions[prevCategory].length - 1);
      }
    }
  };

  const handleNext = () => {
    const currentQuestionId =
      questions[currentCategory]?.[currentQuestionIndex]?.id;
    const currentQuestion = findQuestionById(currentQuestionId);

    if (temporarySelection && currentQuestion) {
      const isCorrect = currentQuestion.correct_answer === temporarySelection;
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [currentQuestionId]: { selectedAnswer: temporarySelection, isCorrect },
      }));
    }
    setTemporarySelection(null);

    const totalQuestionsShown =
      categories
        .slice(0, categories.indexOf(currentCategory))
        .reduce((sum, category) => sum + questions[category].length, 0) +
      currentQuestionIndex +
      1;

    if (totalQuestionsShown >= MAX_QUESTIONS) {
      alert("You have reached the maximum number of questions.");
      return;
    }

    const currentCategoryIndex = categories.indexOf(currentCategory);
    if (currentQuestionIndex < questions[currentCategory].length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentCategoryIndex < categories.length - 1) {
      const nextCategory = categories[currentCategoryIndex + 1];
      setCurrentCategory(nextCategory);
      setCurrentQuestionIndex(0);
    } else {
      alert("End of the exam");
    }
  };

  if (isLoading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading questions: {error.message}
      </div>
    );

  if (!currentCategory) {
    return <div>Loading categories...</div>;
  }

  const questionArray = questions[currentCategory];

  if (currentQuestionIndex >= questionArray.length) {
    return (
      <div className="text-center text-gray-600">
        No more questions in this category
      </div>
    );
  }

  const currentQuestion = questions[currentCategory]?.[currentQuestionIndex];

  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-lg shadow-md max-w-2xl">
      <div className="mb-5">
        <h3 className="text-lg text-gray-700 border-b-2 border-gray-200 py-2">
          {showConfetti && <Confetti />}
          {showSuccessMessage && <ModulesDisplay />}
          Question {Math.min(currentQuestionIndex + 1, MAX_QUESTIONS)} of{" "}
          {MAX_QUESTIONS}
        </h3>
        <div className="bg-white p-3 rounded shadow-sm mb-4">
          <p className="text-gray-800 font-semibold mb-3">
            {currentQuestion.question}
          </p>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {currentQuestion?.options &&
              Object.entries(currentQuestion.options).map(
                ([key, value], oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() => handleOptionClick(currentQuestion.id, key)}
                    className={`text-gray-700 bg-white border border-gray-300 rounded-md py-2 px-4 transition-colors duration-300 ${
                      temporarySelection === key
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-600 hover:text-white"
                    }`}
                  >
                    {value}
                  </button>
                )
              )}
          </div>
        </div>
        <div className="flex justify-between">
          {currentQuestionIndex !== 0 ||
          categories.indexOf(currentCategory) !== 0 ? (
            <button
              onClick={handlePrevious}
              className="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}
          {isLastQuestion() ? (
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={
                currentQuestionIndex === questionArray.length - 1 &&
                categories.indexOf(currentCategory) === categories.length - 1
              }
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prognostic_Questions;
