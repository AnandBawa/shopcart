import { useState } from "react";
import { Form, useOutletContext } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import day from "dayjs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionTitle } from "@/components";

// Reviews component for each product page where user can review the product if they have order it before and display all other user reviews
const Reviews = ({ reviews, hasOrdered }) => {
  const { user } = useOutletContext();
  let otherReviews = reviews ? [...reviews] : [];
  let hasReviewed = null;
  let userReviewDate = null;

  // find if logged-in user has reviewed the product
  if (reviews && user) {
    otherReviews = reviews.filter((review) => review.author._id !== user._id);
    hasReviewed = reviews.find((review) => review.author._id === user._id);
    if (hasReviewed) {
      userReviewDate = day(hasReviewed.updatedAt).format("DD/MMM/YYYY");
    }
  }

  // useState to handle user star rating
  const [ratingValue, setRatingValue] = useState(hasReviewed?.rating || 0);
  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  return (
    <div className="pt-4 lg:pt-8">
      <SectionTitle text="Reviews" />
      {/* display user review or review form if user has ordered the product */}
      {hasOrdered && (
        <div className="mt-4 grid w-full gap-3">
          <Form method="post">
            <Label htmlFor="review" className="tracking-wide align-text-bottom">
              {hasReviewed ? "Edit" : "Add"} your review:
            </Label>
            <Rating
              className="ml-4"
              initialValue={ratingValue}
              emptyStyle={{ display: "flex" }}
              fillStyle={{ display: "-webkit-inline-box" }}
              onClick={handleRating}
              transition
              size={25}
              // fillColorArray={[
              //   "#EF4444",
              //   "#BD4C6E",
              //   "#8A5498",
              //   "#585BC1",
              //   "#2563EB",
              // ]}
            />
            <Textarea
              className="mt-2 bg-secondary"
              defaultValue={hasReviewed?.review || ""}
              placeholder="Review here ..."
              name="review"
              id="review"
            />
            {hasReviewed && (
              <p className="my-1 text-sm">Reviewed on: {userReviewDate}</p>
            )}
            <input type="hidden" name="rating" value={ratingValue} />
            {hasReviewed && (
              <input type="hidden" name="id" value={hasReviewed._id} />
            )}
            <Button
              variant="outline"
              type="submit"
              name="action"
              value={hasReviewed ? "edit" : "add"}
              className="w-24 h-8 mt-2 text-primary"
            >
              {hasReviewed ? "Save" : "Add"}
            </Button>
            {hasReviewed && (
              <Button
                variant="outline"
                type="submit"
                name="action"
                value="delete"
                className="w-24 h-8 mt-2 ml-2 text-destructive"
              >
                Delete
              </Button>
            )}
          </Form>
        </div>
      )}
      {/* display all reviews */}
      <div className="mt-4">
        <Label htmlFor="reviews" className="text-base tracking-wide">
          User Reviews
        </Label>
        {otherReviews.length === 0 ? (
          <h1 className="mt-1 text-sm">No reviews found</h1>
        ) : (
          <div className="mt-1 grid gap-2">
            {otherReviews.map((review) => {
              const date = day(review.updatedAt).format("DD/MMM/YYYY");
              return (
                <div
                  key={review._id}
                  className="grid my-1 bg-secondary p-2 rounded-2xl"
                >
                  <div className="flex justify-between">
                    <h1 className="text-sm font-semibold">
                      {review.author.firstName}
                    </h1>
                    <h1 className="text-sm">{date}</h1>
                  </div>
                  <div className="">
                    <Rating
                      initialValue={review.rating}
                      readOnly
                      emptyStyle={{ display: "flex" }}
                      fillStyle={{ display: "-webkit-inline-box" }}
                      size={15}
                    />
                    <h1 className="mt-1 text-sm">{review.review}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
