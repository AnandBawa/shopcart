import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-[90vh] grid place-items-center">
      <Loader2 className="text-primary h-24 w-24 animate-spin" />
    </div>
  );
};

export default Loading;
