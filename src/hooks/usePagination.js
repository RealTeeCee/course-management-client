import { useState } from "react";

export default function usePagination(
  initialPage = 1,
  defaultPageSize = process.env.REACT_APP_LIMIT_PAGE
) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const startOffSet =
    (currentPage - 1) * parseInt(defaultPageSize);
  const endOffSet = startOffSet + parseInt(defaultPageSize);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return {
    currentPage,
    handleChangePage,
    startOffSet,
    endOffSet,
  };
}
