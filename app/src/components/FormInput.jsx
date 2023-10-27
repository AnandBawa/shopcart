import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// a label and input tag combine as FormInput component
const FormInput = ({
  type,
  name,
  label,
  defaultValue,
  required,
  onChange,
  accept,
  min,
  max,
}) => {
  if (required) {
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
          onChange={onChange}
          accept={accept}
          min={min}
          max={max}
          required
        />
      </div>
    );
  }

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
        onChange={onChange}
        accept={accept}
        min={min}
        max={max}
      />
    </div>
  );
};

export default FormInput;
