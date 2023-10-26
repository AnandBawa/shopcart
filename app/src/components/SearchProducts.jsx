import { Form, Link, useLoaderData, useSubmit } from "react-router-dom";
import { FormRow } from ".";
import FormSelect from "./FormSelect";
import { Button } from "./ui/button";
import {
  CATEGORY,
  SUB_CATEGORY,
  SORT_BY,
  GENERAL,
  PERIPHERALS,
  ACCESSORIES_OTHER,
  EXPANSIONCARDS_NETWORKING,
} from "../../../server/utils/constants.js";

const SearchProducts = () => {
  const submit = useSubmit();
  const { searchValues } = useLoaderData();
  const { search, category, subcategory, sort, minPrice, maxPrice } =
    searchValues;

  let subcat = [];

  if (category === "All" || !category) subcat = SUB_CATEGORY;
  if (category === "Accessories / Other") subcat = ACCESSORIES_OTHER;
  if (category === "Expansion Cards / Networking")
    subcat = EXPANSIONCARDS_NETWORKING;
  if (category === "General") subcat = GENERAL;
  if (category === "Peripherals") subcat = PERIPHERALS;

  let debounceTimer;
  const delaySubmit = (e) => {
    const form = e.currentTarget.form;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      submit(form);
    }, 1000);
  };

  return (
    <Form className="bg-secondary rounded-xl p-4 mt-4">
      <div className="grid lg:grid-cols-3 gap-4">
        <FormRow
          type="search"
          name="search"
          label="Search by Name"
          defaultValue={search}
          onChange={delaySubmit}
        />
        <FormSelect
          name="category"
          label="Category"
          defaultValue={category}
          list={["All", ...Object.values(CATEGORY).sort()]}
          onChange={(e) => {
            document.getElementById("subcategory").value = "All";
            submit(e.currentTarget.form);
          }}
        />
        <FormSelect
          name="subcategory"
          label="Sub-Category"
          defaultValue={subcategory}
          list={["All", ...Object.values(subcat).sort()]}
          onChange={(e) => {
            submit(e.currentTarget.form);
          }}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormRow
            type="number"
            min={0}
            name="minPrice"
            label="Minimum Price"
            defaultValue={minPrice}
            onChange={delaySubmit}
          />
          <FormRow
            type="number"
            min={0}
            name="maxPrice"
            label="Maximum Price"
            defaultValue={maxPrice}
            onChange={delaySubmit}
          />
        </div>
        <FormSelect
          name="sort"
          label="Sort by"
          defaultValue={sort}
          list={[...Object.values(SORT_BY)]}
          onChange={(e) => {
            submit(e.currentTarget.form);
          }}
        />
        <div className="grid grid-cols-2 gap-2 items-end">
          <Button type="submit">Search</Button>
          <Button asChild>
            <Link to="/products">Reset</Link>
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default SearchProducts;
