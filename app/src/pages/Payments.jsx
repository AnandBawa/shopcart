import { Form, useOutletContext, redirect, Navigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import fetchData from "@/utils/fetchData";

export const paymentAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { action, id } = data;

    if (action === "add") {
      delete data.action;
      delete data.id;
      try {
        await fetchData.post(`/users/payment-method`, data);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success(`Payment added successfully`);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
      return redirect("/payment-methods");
    }

    if (action === "edit") {
      delete data.action;
      delete data.id;
      try {
        await fetchData.patch(`/users/payment-method/${id}`, data);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success(`Payment method edited successfully`);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
      return redirect("/payment-methods");
    }
    if (action === "delete") {
      try {
        await fetchData.delete(`/users/payment-method/${id}`);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success(`Payment method deleted`);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
      return redirect("/payment-methods");
    }
  };

const Payments = () => {
  const { user } = useOutletContext();

  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="px-2 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8">
      <SectionTitle text="Payment Methods" />
      <div
        key={user.payments}
        className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mt-4 place-items-center "
      >
        <div className="w-[250px] lg:w-[300px] h-[300px] flex flex-col justify-center items-center bg-secondary rounded-xl">
          <Dialog>
            <DialogTrigger asChild>
              <Plus className="h-16 w-16 cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add a Payment</DialogTitle>
              </DialogHeader>
              <Form method="post">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input required id="nickname" name="nickname" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input required id="name" name="name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="number">Card number</Label>
                    <Input required id="number" name="number" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiryMonth">Expires</Label>
                      <Select required id="expiryMonth" name="expiryMonth">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">January</SelectItem>
                          <SelectItem value="2">February</SelectItem>
                          <SelectItem value="3">March</SelectItem>
                          <SelectItem value="4">April</SelectItem>
                          <SelectItem value="5">May</SelectItem>
                          <SelectItem value="6">June</SelectItem>
                          <SelectItem value="7">July</SelectItem>
                          <SelectItem value="8">August</SelectItem>
                          <SelectItem value="9">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="expiryYear">Year</Label>
                      <Select required id="expiryYear" name="expiryYear">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem
                              key={i}
                              value={`${new Date().getFullYear() + i}`}
                            >
                              {new Date().getFullYear() + i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input required id="cvc" name="cvc" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" name="action" value="add">
                      Add
                    </Button>
                  </DialogFooter>
                </div>
              </Form>
            </DialogContent>
          </Dialog>
          <h1 className="text-sm">Add Payment</h1>
        </div>
        {user.payments.map((payment, index) => {
          return (
            <div
              key={payment._id}
              className="w-[250px] lg:w-[300px] h-[300px] grid px-4 items-center bg-secondary rounded-xl"
            >
              <h1 className="text-sm font-semibold tracking-wide">
                #{index + 1}: {payment.nickname}
              </h1>
              <Separator className="bg-background" />
              <h1 className="text-sm">Name: {payment.name}</h1>
              <h1 className="text-sm">
                Card Number:{" "}
                {`${"*".repeat(12)}${payment.number.toString().slice(12)}`}
              </h1>
              <h1 className="text-sm">
                Expiry: {payment.expiryMonth} / {payment.expiryYear}
              </h1>
              <h1 className="text-sm">
                CVC: {`${"*".repeat(payment.cvc.toString().length)}`}
              </h1>
              <Separator className="bg-background" />
              <div className="grid gap-6 grid-cols-2 place-items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-8 w-20">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Payment</DialogTitle>
                    </DialogHeader>
                    <Form method="post">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="nickname">Nickname</Label>
                          <Input
                            required
                            id="nickname"
                            name="nickname"
                            defaultValue={payment.nickname}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            required
                            id="name"
                            name="name"
                            defaultValue={payment.name}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="number">Card number</Label>
                          <Input
                            required
                            id="number"
                            name="number"
                            defaultValue={payment.number}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expiryMonth">Expires</Label>
                            <Select
                              required
                              id="expiryMonth"
                              name="expiryMonth"
                              defaultValue={`${payment.expiryMonth}`}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">January</SelectItem>
                                <SelectItem value="2">February</SelectItem>
                                <SelectItem value="3">March</SelectItem>
                                <SelectItem value="4">April</SelectItem>
                                <SelectItem value="5">May</SelectItem>
                                <SelectItem value="6">June</SelectItem>
                                <SelectItem value="7">July</SelectItem>
                                <SelectItem value="8">August</SelectItem>
                                <SelectItem value="9">September</SelectItem>
                                <SelectItem value="10">October</SelectItem>
                                <SelectItem value="11">November</SelectItem>
                                <SelectItem value="12">December</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="expiryYear">Year</Label>
                            <Select
                              required
                              id="expiryYear"
                              name="expiryYear"
                              defaultValue={`${payment.expiryYear}`}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => (
                                  <SelectItem
                                    key={i}
                                    value={`${new Date().getFullYear() + i}`}
                                  >
                                    {new Date().getFullYear() + i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              required
                              id="cvc"
                              name="cvc"
                              defaultValue={payment.cvc}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <input type="hidden" name="id" value={payment._id} />
                          <Button type="submit" name="action" value="edit">
                            Save
                          </Button>
                        </DialogFooter>
                      </div>
                    </Form>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-8 w-20 text-destructive hover:text-destructive"
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Form method="post">
                        <input type="hidden" name="id" value={payment._id} />
                        <Button
                          type="submit"
                          name="action"
                          value="delete"
                          variant="outline"
                          className="w-full text-destructive hover:text-destructive"
                        >
                          Delete
                        </Button>
                      </Form>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Payments;
