import { useState } from "react";

export default function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const startOffSet =
    (currentPage - 1) * parseInt(process.env.REACT_APP_LIMIT_PAGE);
  const endOffSet = startOffSet + parseInt(process.env.REACT_APP_LIMIT_PAGE);

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
