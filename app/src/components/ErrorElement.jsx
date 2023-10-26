import { useRouteError, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import imgError from "../assets/images/error.svg";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <main className="grid min-h-[90vh] place-items-center">
      <div className="text-center">
        <img
          src={imgError}
          style={{ width: "90vw", maxWidth: "600px" }}
          alt="404"
        />
        <h1 className="mt-6 text-2xl tracking-tight sm:text-4xl">
          There was an error...
        </h1>
        <div className="mt-10">
          <Button asChild>
            <Link to="/" className="sm:text-base">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorElement;
