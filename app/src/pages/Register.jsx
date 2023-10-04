import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
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
import { FormRow, Logo } from "@/components";
import fetchData from "@/utils/fetchData";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };

  try {
    const response = await fetchData.post("/register", data);
    toast.success("Account registered successfully");
    toast.success(response?.data?.msg, { delay: 2000 });
    return redirect("/");
  } catch (error) {
    errors.msg = error?.response?.data?.msg;
    return errors;
  }
};

const Register = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-[90vh] grid place-items-center ">
      <Card className=" px-2 sm:w-[450px] bg-secondary">
        <CardHeader>
          <CardTitle className="grid place-items-center">
            <Logo width="300px" />
          </CardTitle>
          <CardDescription className="text-xl font-semibold tracking-widest text-center pt-2">
            REGISTER
          </CardDescription>
          {errors?.msg ? (
            <p className="text-sm font-semibold tracking-wider text-destructive text-center">
              {errors.msg}
            </p>
          ) : (
            <CardDescription className="text-sm font-semibold tracking-wider text-center">
              * all fields are required
            </CardDescription>
          )}
        </CardHeader>
        <Form method="post">
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormRow
                type="text"
                name="firstName"
                label="First Name"
                defaultValue="Anand"
                required={true}
              />
              <FormRow
                type="text"
                name="lastName"
                label="Last Name"
                defaultValue="B"
                required={true}
              />
              <FormRow
                type="email"
                name="email"
                label="Email"
                defaultValue="anand@gmail.com"
                required={true}
              />
              <FormRow
                type="text"
                name="phone"
                label="Phone Number"
                defaultValue="1234567890"
                required={true}
              />
              <FormRow
                type="password"
                name="password"
                label="Password"
                defaultValue="Anand!23"
                required={true}
              />
              <FormRow
                type="password"
                name="repeatPassword"
                label="Repeat Password"
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
                Register
              </Button>
            )}
            <p
              className={
                isSubmitting
                  ? "invisible"
                  : "font-medium text-base tracking-wider"
              }
            >
              Already a member?{" "}
              <Link to="/login" className="text-primary ml-2">
                Login
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

export default Register;
