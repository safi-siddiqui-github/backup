import { FormFieldWithSubsOne } from "@/actions/form-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function FieldView(props: { formfield: FormFieldWithSubsOne }) {
  const formfield = props?.formfield;

  return (
    <div className="flex flex-col gap-4">
      <Label>
        {formfield?.name}
        {formfield?.isRequired ? "*" : ""}
      </Label>

      {formfield?.type === "TEXT" ? (
        <Input placeholder={formfield?.placeholder ?? ""} />
      ) : formfield?.type === "TEXTAREA" ? (
        <Textarea
          placeholder={formfield?.placeholder ?? ""}
          className="h-32"
        />
      ) : formfield?.type === "RADIO" ? (
        <RadioGroup defaultValue="">
          {formfield?.options?.map((each) => (
            <div
              key={each?.id}
              className="flex items-center gap-3"
            >
              <RadioGroupItem
                value={each?.slug}
                id={each?.slug}
              />
              <Label htmlFor={each?.slug}>{each?.name}</Label>
            </div>
          ))}
        </RadioGroup>
      ) : formfield?.type === "SELECT" ? (
        <Select>
          <SelectTrigger className="w-full flex-1">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {formfield?.options?.map((each) => (
                <SelectItem
                  key={each?.id}
                  value={each?.slug}
                >
                  {each?.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : formfield?.type === "CHECKBOX" ? (
        <div className="flex flex-col gap-2">
          {formfield?.options?.map((each) => (
            <div
              key={each?.id}
              className="flex items-start gap-3"
            >
              <Checkbox id={each?.slug} />
              <Label htmlFor={each?.slug}>{each?.name}</Label>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
