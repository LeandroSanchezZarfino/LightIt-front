import { Symptomp } from "./SymptompsInterface";

export interface DiagnosisInterface {
  id: number;
  name: string;
  prof_name: string;
  accuracy: number;
  icd_name: string;
  correct: "correct" | "incorrect" | "pending";
  web_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  symptoms: Array<Symptomp>;
}

export interface DiagnosisFormInterface {
  symptoms: Array<number>;
}

export interface DiagnosisResponse {
  data: Array<DiagnosisInterface>;
}
