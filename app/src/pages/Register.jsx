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

const Register = () => {
  return (
    <div className="min-h-[90vh] grid place-items-center">
      <Card className=" px-2">
        <CardHeader>
          <CardTitle className="grid place-items-center">
            <Logo width="300px" />
          </CardTitle>
          <CardDescription className="text-xl font-semibold tracking-widest text-center pt-2">
            REGISTER
          </CardDescription>
        </CardHeader>
        <Form>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormRow
                type="text"
                name="firstName"
                label="First Name"
                defaultValue="Anand"
              />
              <FormRow
                type="text"
                name="lastName"
                label="LastName"
                defaultValue="B"
              />
              <FormRow
                type="email"
                name="email"
                label="Email"
                defaultValue="anand@gmail.com"
              />
              <FormRow
                type="number"
                name="phone"
                label="Phone Number"
                defaultValue="1234567890"
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
              Register
            </Button>
            <p className="font-medium text-base tracking-wider">
              Already a member?{" "}
              <Link to="/login" className="text-primary ml-2">
                Login
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

export default Register;
