import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormRow = ({ type, name, label, defaultValue }) => {
  return (
    <div className="grid w-full items-center gap-1">
      <Label className="tracking-wider capitalize" htmlFor={name}>
        {label || name}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        required
      />
    </div>
  );
};

export default FormRow;
