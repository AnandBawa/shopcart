import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import fetchData from "../utils/fetchData";

export const deleteAddressAction = async ({ params }) => {
  try {
    await fetchData.delete(`/users/address-book/${params.id}`);
    toast.success(`Address deleted`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/address-book");
};
