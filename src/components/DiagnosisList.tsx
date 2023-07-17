import { Button, Empty, Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Page, PaginatedData, defaultPage } from "../interfaces/AppInterface";
import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import Diagnosis from "./Diagnosis";
import { DiagnosisInterface } from "../interfaces/DiagnosisInterface";
import { getDiagnoses } from "../services/DiagnoseService";

const DiagnosisList = () => {
  const [diagnoses, setDiagnoses] = useState<Array<DiagnosisInterface>>([]);
  const [page, setPage] = useState<Page>(defaultPage);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    handleFetch(page.current_page);
  }, []);

  const validateDiagnosis = (id: number, correct: boolean) => {
    const index = diagnoses.findIndex((diagnosis) => diagnosis.id === id);
    diagnoses[index].correct = correct ? "correct" : "incorrect";
    setDiagnoses([...diagnoses]);
  };

  const handlePageChange = (newPage: number) => {
    handleFetch(newPage);
  };

  const handleFetch = (page: number) => {
    setLoading(true);
    getDiagnoses(page)
      .then((res: AxiosResponse<PaginatedData<DiagnosisInterface>>) => {
        if (res.data.data.length === 0) {
          setNoResults(true);
        }
        setDiagnoses(res.data.data);
        setPage(res.data);
      })
      .finally(() => setLoading(false));
  };

  return loading ? (
    <div className="flex justify-center items-center m-12 p-20">
      <Spin size="large" />
    </div>
  ) : (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {diagnoses.map((diagnosis: DiagnosisInterface) => (
          <Diagnosis
            validateCallback={validateDiagnosis}
            diagnosis={diagnosis}
            key={diagnosis.id}
          />
        ))}
      </div>
      {noResults ? (
        <div className="shadow bg-white py-20 my-12 border-gray-400 rounded-lg">
          <Empty
            description={"Your history is empty. No diagnosis records found."}
          />
        </div>
      ) : (
        <div className="flex flex-row justify-center mt-8">
          <Button
            icon={<LeftOutlined />}
            type="primary"
            shape="circle"
            onClick={() => handlePageChange(page.current_page - 1)}
            disabled={page.current_page === 1}
          />
          <h4 className="text-lg font-normal mx-4">
            {page.current_page}/{Math.ceil(page.total / page.per_page)}
          </h4>
          <Button
            icon={<RightOutlined />}
            type="primary"
            shape="circle"
            onClick={() => handlePageChange(page.current_page + 1)}
            disabled={
              page.current_page === Math.ceil(page.total / page.per_page)
            }
          />
        </div>
      )}
    </>
  );
};

export default DiagnosisList;
