import { Label } from "@/components/ui/label";

// a label and select tag combine as Form Select component
const FormSelect = ({ name, label, defaultValue, list, onChange }) => {
  return (
    <div className="grid w-full items-center gap-1">
      <Label className="tracking-wider capitalize" htmlFor={name}>
        {label || name}
      </Label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
