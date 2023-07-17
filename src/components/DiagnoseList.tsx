import React, { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { getDiagnoses } from "../services/DiagnoseService";

interface Diagnosis {
  id: number;
  name: string;
  prof_name: string;
  accuracy: string;
  icd_name: string;
  correct: "correct" | "incorrect" | "pending";
  web_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

const DiagnosisList = () => {
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);

  useEffect(() => {
    getDiagnoses().then((res: AxiosResponse<Array<Diagnosis>>) => {
      setDiagnoses(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col">
      {diagnoses.map((diagnosis: Diagnosis) => (
        <div>
            <div className="flex flex-row">
                {diagnosis.name}
                {diagnosis.prof_name}
                {diagnosis.accuracy}
                {diagnosis.icd_name}
                {diagnosis.correct}
            </div>                    
        </div>
      ))}
    </div>
  );
};

export default DiagnosisList;
