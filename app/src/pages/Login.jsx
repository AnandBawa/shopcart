import {
  Link,
  Form,
  redirect,
  useNavigation,
  useOutletContext,
  Navigate,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput, Logo } from "@/components";
import fetchData from "@/lib/fetchData";

// React Router action to login the user on login form submission
export const loginAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const redirectTo = data.redirectTo;

    try {
      delete data.redirectTo;
      const response = await fetchData.post("/login", data);
      queryClient.invalidateQueries();
      toast.success(response?.data?.msg || "Welcome!");
      return redirect(redirectTo);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Please try again");
      return error;
    }
  };

const Login = () => {
  // use the useLocation hook to get previous page or default to homepage and pass it to login action as hidden input to redirect to after login
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const { user } = useOutletContext();

  // useNavigation hook to disable buttons when form is being submitted
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // disable login page access if user is logged in and redirect to home page
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
              <FormInput
                type="text"
                name="phone"
                label="Email / Phone Number"
                required={true}
              />
              <FormInput
                key={Math.random()}
                type="password"
                name="password"
                label="Password"
                required={true}
              />
            </div>
          </CardContent>
          <CardFooter className="grid gap-4 text-center">
            <input type="hidden" name="redirectTo" value={redirectTo} />
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
