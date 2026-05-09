import { ModuleWithSubsTwo } from "@/actions/module";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormFieldComponent from "./FormFieldComponent";
import FormTypeComponent from "./FormTypeComponent";

export default function FormBuilder(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props?.module;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-4 lg:flex-row">
        {/*  */}

        <div className="lg:max-w-xs lg:flex-1">
          <FormTypeComponent />
        </div>

        <div className="lg:flex-1">
          <FormFieldComponent module={moduleD} />
        </div>
      </div>
    </DndProvider>
  );
}
