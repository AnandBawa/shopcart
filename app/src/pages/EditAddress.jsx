import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import fetchData from "../utils/fetchData";

export const editAddressAction = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await fetchData.patch(`/users/address-book/${params.id}`, data);
    toast.success(`Address edited successfully`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/address-book");
};
