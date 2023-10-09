import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormRange = ({ label, name, step, min, value, max, onChange }) => {
  return (
    <div className="grid w-full items-center gap-1">
      <Label
        htmlFor={name}
        className="flex justify-between tracking-wider capitalize"
      >
        <span>{label || name}</span>
        <span>$ {value}</span>
      </Label>
      <Input
        type="range"
        id={name}
        name={name}
        step={step}
        min={min}
        max={max}
        value={value || max}
        onChange={onChange}
        className="p-0 h-5"
      />
      <Label className="flex justify-between">
        <span className="">Min : {min}</span>
        <span className="">Max : {max}</span>
      </Label>
    </div>
  );
};
export default FormRange;
