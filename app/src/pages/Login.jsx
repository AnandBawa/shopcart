import { Link, Form } from "react-router-dom";
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

const Login = () => {
  return (
    <div className="min-h-[90vh] grid place-items-center">
      <Card className="px-2">
        <CardHeader>
          <CardTitle className="grid place-items-center">
            <Logo width="250px" />
          </CardTitle>
          <CardDescription className="text-xl font-semibold tracking-widest text-center pt-2">
            LOGIN
          </CardDescription>
        </CardHeader>
        <Form>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormRow
                type="text"
                name="emailOrPhone"
                label="Email / Phone Number"
                defaultValue="anand@gmail.com"
              />
              <FormRow
                type="password"
                name="password"
                label="Password"
                defaultValue="anand123"
              />
            </div>
          </CardContent>
          <CardFooter className="grid gap-4 text-center">
            <Button type="submit" className="text-base tracking-wide">
              Submit
            </Button>
            <Button className="text-base tracking-wide">
              Explore the Site
            </Button>
            <p className="font-medium text-base tracking-wider">
              Not registered yet?{" "}
              <Link to="/register" className="text-primary ml-2">
                Register
              </Link>
            </p>
            <Link
              to="/"
              className="font-medium text-base tracking-wider text-primary"
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
