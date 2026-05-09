import {
  findFormFieldWhereModuleId,
  FormFieldWithSubsOne,
} from "@/actions/form-field";
import { ModuleWithSubsTwo } from "@/actions/module";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Eye, MapPin, PartyPopper } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import LoaderSpin from "../LoaderSpin";
import FieldView from "./FieldView";

export default function FormPreview(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props?.module;
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState<FormFieldWithSubsOne[]>([]);
  //
  const findFormFieldsFN = useCallback(async () => {
    setIsLoading(true);
    const formFields = await findFormFieldWhereModuleId(moduleD?.id ?? 0);
    setFormFields(formFields);
    setIsLoading(false);
  }, [moduleD]);
  //
  useEffect(() => {
    findFormFieldsFN();
  }, [findFormFieldsFN]);

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-col">
        <CardTitle className="flex items-center gap-2">
          <Eye /> Form Preview
        </CardTitle>
        <CardDescription>How guests view you form</CardDescription>
        {isLoading && <LoaderSpin />}
      </CardContent>

      <div className="flex flex-col items-center">
        <CardContent className="flex w-full max-w-3xl flex-col gap-10">
          <Card className="flex flex-col">
            <CardContent className="flex flex-col items-center gap-2 text-center">
              <Badge>
                <PartyPopper />
                Invitation
              </Badge>
              <CardTitle>{moduleD?.event?.name}</CardTitle>
              <CardDescription>{moduleD?.event?.description}</CardDescription>
            </CardContent>

            <Separator />

            <CardContent className="flex flex-wrap items-center justify-evenly gap-6">
              <div className="flex items-center gap-4">
                <div className="flex flex-col text-center">
                  <p className="">Custom</p>
                  <CardDescription>at &nbsp; Custom</CardDescription>
                </div>
                <Calendar />
              </div>
              <Separator
                orientation="vertical"
                className="!h-10"
              />
              <div className="flex items-center gap-4">
                <MapPin />
                <div className="flex flex-col text-center">
                  <p className="">{moduleD?.event?.venueName}</p>
                  <CardDescription>
                    {moduleD?.event?.venueAddress}
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardContent className="flex flex-col gap-2">
              <CardTitle>Respond by Date &nbsp; Custom</CardTitle>
              <CardDescription>
                We&apos;re excited to celebrate with you! Please let us know if
                you can attend.
              </CardDescription>
            </CardContent>

            <Separator />

            <CardContent className="flex flex-col gap-6">
              {formFields?.map((each) => (
                <FieldView
                  formfield={each}
                  key={each?.id}
                />
              ))}
              <Button>Continue</Button>
            </CardContent>
          </Card>
        </CardContent>
      </div>
    </Card>
  );
}
