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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import fetchData from "@/utils/fetchData";

export const addressAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { action, id } = data;

  if (action === "add") {
    delete data.action;
    delete data.id;
    try {
      await fetchData.post(`/users/address-book`, data);
      toast.success(`Address added successfully`);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/address-book");
  }

  if (action === "edit") {
    delete data.action;
    delete data.id;
    try {
      await fetchData.patch(`/users/address-book/${id}`, data);
      toast.success(`Address edited successfully`);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/address-book");
  }

  if (action === "delete") {
    try {
      await fetchData.delete(`/users/address-book/${id}`);
      toast.success(`Address deleted`);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/address-book");
  }
};

const AddressBook = () => {
  const { user } = useOutletContext();

  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to="/" />;
  }

  return (
    <div className="px-2 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8">
      <SectionTitle text="Address Book" />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mt-4 place-items-center ">
        <div className="w-[250px] lg:w-[300px] h-[300px] flex flex-col justify-center items-center bg-secondary rounded-xl">
          <Dialog>
            <DialogTrigger asChild>
              <Plus className="h-16 w-16 cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add an Address</DialogTitle>
              </DialogHeader>
              <Form method="post">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nickname" className="text-right">
                      Nickname:
                    </Label>
                    <Input
                      id="nickname"
                      name="nickname"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="add1" className="text-right">
                      Line 1:
                    </Label>
                    <Input
                      id="add1"
                      name="add1"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="add2" className="text-right">
                      Line 2:
                    </Label>
                    <Input
                      id="add2"
                      name="add2"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pin" className="text-right">
                      PIN:
                    </Label>
                    <Input
                      id="pin"
                      name="pin"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location:
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" name="action" value="add">
                    Add
                  </Button>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>
          <h1 className="text-sm">Add Address</h1>
        </div>
        {user.address.map((address, index) => {
          return (
            <div
              key={address._id}
              className="w-[250px] lg:w-[300px] h-[300px] grid px-4 items-center bg-secondary rounded-xl"
            >
              <h1 className="text-sm font-semibold tracking-wide">
                #{index + 1}: {address.nickname}
              </h1>
              <Separator className="bg-background" />
              <h1 className="text-sm">{address.add1}</h1>
              <h1 className="text-sm">{address.add2}</h1>
              <h1 className="text-sm">{address.pin}</h1>
              <h1 className="text-sm">{address.location}</h1>
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
                      <DialogTitle>Edit Address</DialogTitle>
                    </DialogHeader>
                    <Form method="post">
                      <input type="hidden" name="id" value={address._id} />
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="nickname" className="text-right">
                            Nickname:
                          </Label>
                          <Input
                            id="nickname"
                            name="nickname"
                            defaultValue={address.nickname}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="add1" className="text-right">
                            Line 1:
                          </Label>
                          <Input
                            id="add1"
                            name="add1"
                            defaultValue={address.add1}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="add2" className="text-right">
                            Line 2:
                          </Label>
                          <Input
                            id="add2"
                            name="add2"
                            defaultValue={address.add2}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="pin" className="text-right">
                            PIN:
                          </Label>
                          <Input
                            id="pin"
                            name="pin"
                            defaultValue={address.pin}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right">
                            Location:
                          </Label>
                          <Input
                            id="location"
                            name="location"
                            defaultValue={address.location}
                            className="col-span-3"
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" name="action" value="edit">
                          Save
                        </Button>
                      </DialogFooter>
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
                        <input type="hidden" name="id" value={address._id} />
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

export default AddressBook;
