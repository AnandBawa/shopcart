import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <h4 className="px-4 font-bold text-xl md:text-4xl mx-auto w-full md:max-w-[80vw]">
      There was an error...
    </h4>
  );
};

export default ErrorElement;
