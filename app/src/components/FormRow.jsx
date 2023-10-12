import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormRow = ({
  type,
  name,
  label,
  defaultValue,
  required,
  onChange,
  accept,
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
      />
    </div>
  );
};

export default FormRow;
