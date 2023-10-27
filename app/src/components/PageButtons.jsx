import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Page Buttons component that is rendered based on number of pages for a given search
const PageButtons = ({ numPages, currentPage }) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  // onClick page change function that queries the current search params for a given page number
  const pageChange = (page) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("pageNo", page);
    console.log(searchParams.toString());
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  // function that return an individual button
  const addPageButton = ({ page, active }) => {
    return (
      <Button
        variant="outline"
        className={`h-8 ${active && "bg-primary"}`}
        key={page}
        onClick={() => pageChange(page)}
      >
        {page}
      </Button>
    );
  };

  // function that creates all the page buttons
  const renderPageButtons = () => {
    const pageButtons = [];

    // first button
    pageButtons.push(addPageButton({ page: 1, active: currentPage === 1 }));

    // dots
    if (currentPage > 3) {
      pageButtons.push(
        <Button disabled variant="outline" className="h-8" key="dots-1">
          . . .
        </Button>
      );
    }

    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          active: false,
        })
      );
    }

    // current page
    if (currentPage !== 1 && currentPage !== numPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          active: true,
        })
      );
    }

    // one after current page
    if (currentPage !== numPages - 1 && currentPage !== numPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage + 1,
          active: false,
        })
      );
    }

    // dots
    if (currentPage < numPages - 2) {
      pageButtons.push(
        <Button disabled variant="outline" className="h-8" key="dots+1">
          . . .
        </Button>
      );
    }

    // last button
    pageButtons.push(
      addPageButton({
        page: numPages,
        active: currentPage === numPages,
      })
    );
    return pageButtons;
  };

  // render previous, middle buttons and next button
  return (
    <div className="flex gap-2 place-items-center ">
      <Button
        variant="outline"
        className="p-1 h-8 y"
        onClick={() => {
          let prev = currentPage - 1;
          if (prev < 1) prev = numPages;
          pageChange(prev);
        }}
      >
        <ChevronLeft />
      </Button>
      <div id="buttons">{renderPageButtons()}</div>
      <Button
        variant="outline"
        className="p-1 h-8 "
        onClick={() => {
          let next = currentPage + 1;
          if (next > numPages) next = 1;
          pageChange(next);
        }}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default PageButtons;
