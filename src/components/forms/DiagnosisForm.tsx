import { Button, Form, Select, Spin } from "antd";
import {
  DiagnosisFormInterface,
  DiagnosisInterface,
  DiagnosisResponse,
} from "../../interfaces/DiagnosisInterface";
import React, { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { DefaultOptionType } from "antd/lib/select";
import { Symptomp } from "../../interfaces/SymptompsInterface";
import { createDiagnosis } from "../../services/DiagnoseService";
import { debounce } from "lodash";
import { findSymptomps } from "../../services/SymptompsService";

const { Item } = Form;

interface Props {
  setDiagnoses: React.Dispatch<React.SetStateAction<Array<DiagnosisInterface>>>;
}

/**
 * In this component, we have implemented a symptom search functionality within a Select component.
 * When the user searches for symptoms, we have considered two options:
 *
 * 1. If the number of symptom records is small, it is efficient to store all the symptoms as component state.
 *   This approach avoids overloading the API and allows for faster filtering and rendering of options,
 *   as the data is readily available in memory.
 *
 * 2. If there are a large number of symptoms, it is not practical to keep them all in memory.
 *    In such cases, we allow the user to input characters and search for matching options through the API.
 *    To optimize this approach, we use lodash's debounce function to add a delay, preventing excessive API calls
 *    and ensuring a smooth user experience.
 */

const DiagnosisForm = (props: Props) => {
  const [symptoms, setSymptomps] = useState<Array<DefaultOptionType>>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const symptomsToOption = (symptoms: Array<Symptomp>) =>
    symptoms.map((symptom) => ({
      label: symptom.name,
      value: symptom.id,
    }));

  /**
   * Option 1 solution
   */
  useEffect(() => {
    setLoading(true);
    findSymptomps("")
      .then((res: AxiosResponse<Array<Symptomp>>) => {
        setSymptomps(symptomsToOption(res.data));
      })
      .finally(() => setLoading(false));
  }, []);

  /**
   * Option 2 solution:
   * uncomment the code below and comment out the useEffect above
   */
  const handleSearch = debounce((value: string) => {
    /*
    setLoading(true);
    if (value.length < 3) return;
    findSymptomps(value)
      .then((res: AxiosResponse<Array<Symptomp>>) => {
        setSymptomps(res.data);
      })
      .finally(() => setLoading(false));
      */
  }, 300);

  const handleSubmit = (values: DiagnosisFormInterface) => {
    setLoading(true);
    createDiagnosis(values.symptoms)
      .then((res: AxiosResponse<DiagnosisResponse>) => {
        props.setDiagnoses(res.data.data);
        form.resetFields();
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="shadow w-full justify-center md:justify-start items-center bg-white border-2 border-gray-400 rounded-lg px-4 py-3 md:p-8">
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Item
          name="symptoms"
          label="Symptoms"
          extra="You can pick more than one"
        >
          <Select
            // Option 1
            filterOption={(input, option) =>
              (option?.label + "").toLowerCase().includes(input.toLowerCase())
            }
            //Option 2
            // onSearch={handleSearch}

            mode="multiple"
            showSearch
            defaultActiveFirstOption={false}
            showArrow={true}
            loading={loading}
            notFoundContent={
              loading ? (
                <Spin size="small" />
              ) : (
                "No results found, try another search term"
              )
            }
            options={symptoms}
          />
        </Item>
        <Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Get Diagnose!
          </Button>
          <Button
            type="link"
            className="mx-2"
            onClick={() => form.resetFields()}
          >
            Reset
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default DiagnosisForm;
