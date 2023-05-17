import { useState } from "react";
export default function usePaginationBlog(
    initialPage = 1,
    defaultPageSize = 6
){
    const [currentPage, setCurrentPage] = useState(initialPage);
  const limit = defaultPageSize ;
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
      limit
    }; 
  }