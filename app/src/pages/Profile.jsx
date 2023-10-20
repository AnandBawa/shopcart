import {
  Form,
  Navigate,
  useNavigation,
  redirect,
  useOutletContext,
} from "react-router-dom";
import { FormRow, SectionTitle } from "@/components";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import fetchData from "@/utils/fetchData";

export const profileAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.newPassword === data.password) {
    toast.error("New and old password cannot be same");
    return null;
  }

  if (data.newPassword !== data.repeatNewPassword) {
    toast.error("New and repeat password do not match");
    return null;
  }

  if (data.image?.size > 500000) {
    toast.error("Image size is over 0.5 MB");
    return null;
  }

  try {
    await fetchData.patch(`/users/update-user`, formData);
    toast.success(`Profile updated successfully`);
    return redirect("/profile");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return null;
  }
};

const Profile = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to="/" />;
  }

  const { firstName, lastName, email, phone } = user;

  return (
    <div className="px-2 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8">
      <SectionTitle text="Profile" />
      <Form method="post" className="mt-4" encType="multipart/form-data">
        <div className="p-4 grid md:grid-cols-2 xl:grid-cols-3 gap-4 bg-secondary rounded-xl">
          <FormRow
            type="text"
            name="firstName"
            label="First Name"
            defaultValue={firstName}
          />
          <FormRow
            type="text"
            name="lastName"
            label="Last Name"
            defaultValue={lastName}
          />
          <FormRow
            type="email"
            name="email"
            label="Email"
            defaultValue={email}
          />
          <FormRow
            type="text"
            name="phone"
            label="Phone Number"
            defaultValue={phone}
          />
          <FormRow type="password" name="newPassword" label="New Password" />
          <FormRow
            type="password"
            name="repeatNewPassword"
            label="Repeat New Password"
          />
          <FormRow
            type="file"
            name="image"
            accept="image/*"
            label="Update Avatar (Max Size: 0.5 MB)"
          />
          <FormRow
            type="password"
            name="password"
            label="Current Password *"
            required={true}
          />
          {isSubmitting ? (
            <Button disabled className="self-end tracking-wide">
              <Loader2 className="mr-2 animate-spin" />
              Updating...
            </Button>
          ) : (
            <Button type="submit" className="self-end tracking-wide">
              Update
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Profile;
