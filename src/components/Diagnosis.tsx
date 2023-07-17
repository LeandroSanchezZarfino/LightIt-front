import "react-circular-progressbar/dist/styles.css";

import { Button, Popconfirm } from "antd";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { DiagnosisInterface } from "../interfaces/DiagnosisInterface";
import { useState } from "react";
import { validateDiagnosis } from "../services/DiagnoseService";

interface Props {
  validateCallback?: (id: number, correct: boolean) => void;
  diagnosis: DiagnosisInterface;
}

const DiagnosisItem: React.FC<Props> = ({ diagnosis, validateCallback }) => {
  const {
    id,
    name,
    prof_name: profName,
    accuracy,
    correct,
    symptoms,
    created_at,
  } = diagnosis;

  const [loading, setLoading] = useState(false);

  const handleValidation = (correct: boolean) => {
    setLoading(true);
    validateDiagnosis(diagnosis.id, correct)
      .then((res) => {
        validateCallback && validateCallback(id, correct);
      })
      .finally(() => setLoading(false));
  };

  const progressBarStyles = buildStyles({
    pathColor: `hsl(${accuracy}, 70%, 50%)`,
    textColor: "#333",
    trailColor: "#eee",
  });

  const CorrectText = () =>
    correct === "correct" ? (
      <p className={`text-center text-sm mt-1 text-green-500`}>Correct</p>
    ) : (
      <p className={`text-center text-sm mt-1 text-red-500`}>Incorrect</p>
    );

  return (
    <div className="shadow w-full flex flex-col md:flex-row justify-center md:justify-start items-center space-x-4 bg-white border-2 border-gray-400 rounded-lg p-2 md:p-8">
      <div className="flex flex-col justify-center gap-4">
        <div className="w-24 h-24 ">
          <CircularProgressbar
            value={accuracy}
            text={`${Math.floor(accuracy)}%`}
            styles={progressBarStyles}
          />
        </div>
        {correct === "pending" ? (
          <Popconfirm
            title="Was this diagnosis correct?"
            onConfirm={() => handleValidation(true)}
            onCancel={() => handleValidation(false)}
            okText="Yes, it was correct"
            cancelText="No, it was incorrect"
          >
            <Button type="primary" loading={loading}>
              Validate
            </Button>
          </Popconfirm>
        ) : (
          <CorrectText />
        )}
      </div>
      <div className="flex flex-col justify-center p-2 md:p-4">
        <h3 className="text-lg font-medium my-1">{name}</h3>
        <p className="text-gray-500">{profName}</p>
        <p className="">{symptoms.map((symp) => symp.name).join(", ")}</p>
        <p className="text-gray-500">{created_at.split("T")[0]}</p>
      </div>
    </div>
  );
};

export default DiagnosisItem;
