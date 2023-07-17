import { Button, Form, Select, Spin } from "antd";
import React, { useState } from "react";

import { AxiosResponse } from "axios";
import { Symptomp } from "../../interfaces/SymptompsInterface";
import { createDiagnosis } from "../../services/DiagnoseService";
import { debounce } from "lodash";
import { findSymptomps } from "../../services/SymptompsService";

interface DiagnosisFormInterface {
  symptoms: Array<number>;
}

const { Item } = Form;
const DiagnosisForm = () => {
  const [symptoms, setSymptomps] = useState<Array<Symptomp>>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = debounce((value: string) => {
    setLoading(true);
    if (value.length < 3) return;
    findSymptomps(value)
      .then((res: AxiosResponse<Array<Symptomp>>) => {
        setSymptomps(res.data);
      })
      .finally(() => setLoading(false));
  }, 500);

  const handleSubmit = (values: DiagnosisFormInterface) => {

    createDiagnosis(values.symptoms).then((res: any) => {

    });
  };

  return (
    <>
      <Form onFinish={handleSubmit} form={form}>
        <Item name="symptoms">
          <Select
            mode="multiple"
            showSearch
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={false}
            onSearch={handleSearch}
            loading={loading}
            notFoundContent={
              loading ? (
                <Spin size="small" />
              ) : (
                "No results found, try another search term"
              )
            }
          >
            {symptoms.map((symptom) => (
              <Select.Option key={symptom.id} value={symptom.id}>
                {symptom.name}
              </Select.Option>
            ))}
          </Select>
        </Item>
        <Item>
          <Button htmlType="submit">Get Diagnose!</Button>
        </Item>
      </Form>
    </>
  );
};

export default DiagnosisForm;
