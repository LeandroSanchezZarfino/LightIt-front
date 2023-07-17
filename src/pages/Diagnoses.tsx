import AppLayout from "../components/layout/AppLayout";
import Diagnosis from "../components/Diagnosis";
import DiagnosisForm from "../components/forms/DiagnosisForm";
import { DiagnosisInterface } from "../interfaces/DiagnosisInterface";
import { useState } from "react";

const Diagnoses = () => {
  const [diagnoses, setDiagnoses] = useState<Array<DiagnosisInterface>>([]);

  const validateDiagnosis = (id: number, correct: boolean) => {
    const index = diagnoses.findIndex((diagnosis) => diagnosis.id === id);
    diagnoses[index].correct = correct ? "correct" : "incorrect";
    setDiagnoses([...diagnoses]);
  };

  return (
    <AppLayout>
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-2xl w-fit">Diagnosis Form</h1>
        <p className="text-grey-500">
          Complete the form below with your symptoms to obtain potential
          diagnoses. Our system will analyze your symptoms and provide you with
          possible diagnoses based on the input.
        </p>
        <div className="md:w-2/3 lg:w-1/3">
          <DiagnosisForm setDiagnoses={setDiagnoses} />
        </div>
        {diagnoses.length > 0 && (
          <div className="mt-4">
            <h2 className="font-medium text-xl w-fit">Potential Diagnoses</h2>
            <div className="my-2 md:my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {diagnoses.map((diagnosis: DiagnosisInterface) => (
                <Diagnosis
                  validateCallback={validateDiagnosis}
                  diagnosis={diagnosis}
                  key={diagnosis.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Diagnoses;
