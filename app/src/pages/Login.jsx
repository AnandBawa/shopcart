import {
  Link,
  Form,
  redirect,
  useNavigation,
  useOutletContext,
  Navigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormRow, Logo } from "@/components";
import fetchData from "@/utils/fetchData";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await fetchData.post("/login", data);
    toast.success(response?.data?.msg || "Welcome!");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Please try again");
    return error;
  }
};

const Login = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (user) {
    toast.error("You are already logged in");
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="min-h-[90vh] grid place-items-center px-2">
      <Card className="px-2 sm:w-[450px] bg-secondary">
        <CardHeader>
          <CardTitle className="grid place-items-center">
            <Logo width="250px" />
          </CardTitle>
          <CardDescription className="text-xl font-semibold tracking-widest text-center pt-2">
            LOGIN
          </CardDescription>
        </CardHeader>
        <Form method="post">
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormRow
                type="text"
                name="phone"
                label="Email / Phone Number"
                defaultValue="anand@gmail.com"
                required={true}
              />
              <FormRow
                type="password"
                name="password"
                label="Password"
                defaultValue="Anand!23"
                required={true}
              />
            </div>
          </CardContent>
          <CardFooter className="grid gap-4 text-center">
            {isSubmitting ? (
              <Button disabled className="text-base tracking-wide">
                <Loader2 className="mr-2 animate-spin" />
                Submitting...
              </Button>
            ) : (
              <Button type="submit" className="text-base tracking-wide">
                Login
              </Button>
            )}
            <p
              className={
                isSubmitting
                  ? "invisible"
                  : "font-medium text-base tracking-wider"
              }
            >
              Not registered yet?{" "}
              <Link
                to="/register"
                className={isSubmitting ? "invisible" : "text-primary ml-2"}
              >
                Register
              </Link>
            </p>
            <Link
              to="/"
              className={
                isSubmitting
                  ? "invisible"
                  : "font-medium text-base tracking-wider text-primary"
              }
            >
              Home Page
            </Link>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
