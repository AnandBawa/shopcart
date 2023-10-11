import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import fetchData from "../utils/fetchData";

export const editPaymentAction = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await fetchData.patch(`/users/payment-method/${params.id}`, data);
    toast.success(`Payment method edited successfully`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/payment-methods");
};
