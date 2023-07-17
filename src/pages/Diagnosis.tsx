import AppLayout from "../components/layout/AppLayout";
import DiagnosisForm from "../components/forms/DiagnosisForm";

const Diagnosis = () => {
  return (
    <AppLayout>
      <h1>New Diagnosis</h1>
      <DiagnosisForm />
    </AppLayout>
  );
};

export default Diagnosis;
