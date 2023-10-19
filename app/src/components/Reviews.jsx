import { SectionTitle } from ".";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const Reviews = () => {
  return (
    <div className="px-1 pt-4 lg:pt-8">
      <SectionTitle text="Reviews" />
      <div className="mt-4 grid w-full gap-3">
        <Label htmlFor="review" className="tracking-wide">
          Add your review
        </Label>
        <Textarea placeholder="" name="review" id="review" />
        <Button type="submit" className="w-24 h-8">
          Submit
        </Button>
      </div>
      <div className="mt-4">
        <Label htmlFor="reviews" className="text-base tracking-wide">
          User Reviews
        </Label>
        <section id="reviews"></section>
      </div>
    </div>
  );
};

export default Reviews;
