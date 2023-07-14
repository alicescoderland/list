import selectStyles from "../Select/Select.module.css";
import { useState, useEffect, useCallback } from "react";
import { data } from "../../store/data";
import { sortingOptions, paginationOptions } from "../../store/ui";
import Select from "../Select/Select";
import Products from "../Products/Products";
import Pagination from "../Pagination/Pagination";

function Main() {
  const [sortedData, setSortedData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(sortedData.length);

  const sortDataByCompoundCriteria = (field, sortingDirection) => {
    let sortedArray = [...data];

    sortedArray = sortedArray.sort((a, b) => {
      const sortValueA = a[field];
      const sortValueB = b[field];

      if (sortingDirection === "asc") {
        return typeof sortValueA === "string"
          ? sortValueA.localeCompare(sortValueB)
          : sortValueA - sortValueB;
      } else {
        return typeof sortValueA === "string"
          ? sortValueB.localeCompare(sortValueA)
          : sortValueB - sortValueA;
      }
    });

    setSortedData(sortedArray);
  };

  const handleSortChange = (selectedOption) => {
    const [sortingDirection, field] = selectedOption.split("-");
    sortDataByCompoundCriteria(field, sortingDirection);
  };

  const setItemsPerPageAndPaginate = (selectedOption) => {
    let totalPages =
      selectedOption === 0
        ? 1
        : Math.ceil(data.length / parseInt(selectedOption));

    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    setItemsPerPage(parseInt(selectedOption));
  };
  const renderPage = useCallback(
    (currentPage, itemsPerPage) => {
      const firstItemOnPage = (currentPage - 1) * itemsPerPage;
      const firstItemOnNewPage = firstItemOnPage + itemsPerPage;
      const itemsToRender = sortedData.slice(
        firstItemOnPage,
        firstItemOnNewPage
      );

      return itemsToRender;
    },
    [sortedData]
  );

  useEffect(() => {
    renderPage();
  }, [sortedData, currentPage, itemsPerPage, renderPage]);

  const handlePaginationChange = (selectedOption) => {
    setCurrentPage(1);
    setItemsPerPageAndPaginate(selectedOption);
  };

  const totalPages = Math.ceil(data.length / parseInt(itemsPerPage));

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage - 1));
  };

  return (
    <>
      <section className={selectStyles.container}>
        <Select options={sortingOptions} onChange={handleSortChange} />
        <Select options={paginationOptions} onChange={handlePaginationChange} />
      </section>
      <Products data={renderPage(currentPage, itemsPerPage)} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      ></Pagination>
    </>
  );
}

export default Main;
