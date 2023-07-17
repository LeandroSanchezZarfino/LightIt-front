import AppLayout from "../components/layout/AppLayout";
import DiagnosisList from "../components/DiagnosisList";

const Historic = () => {
  return (
    <AppLayout>
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-2xl w-fit">
          Clinical Diagnosis History
        </h1>
        <p className="text-grey-500">
          View a comprehensive history of your clinical diagnoses, including
          details such as diagnoses names, associated symptoms, accuracy, and
          more.
        </p>
        <DiagnosisList />
      </div>
    </AppLayout>
  );
};

export default Historic;
