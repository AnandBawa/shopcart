import { Separator } from "@/components/ui/separator";

const SectionTitle = ({ text }) => {
  return (
    <div className="">
      <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold tracking-wide capitalize ">
        {text}
      </h2>
      <Separator className="mt-2 mb-3" />
    </div>
  );
};

export default SectionTitle;
