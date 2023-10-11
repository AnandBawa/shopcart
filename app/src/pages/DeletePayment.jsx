import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import fetchData from "../utils/fetchData";

export const deletePaymentAction = async ({ params }) => {
  try {
    await fetchData.delete(`/users/payment-method/${params.id}`);
    toast.success(`Payment method deleted`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/payment-methods");
};
