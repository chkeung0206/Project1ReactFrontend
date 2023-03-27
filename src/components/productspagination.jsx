import React from 'react';
import { Pagination } from 'react-bootstrap';

function ProductPagination(props) {
  const { pageNo, setPageNo, noOfPages } = props;
  const paginationLength = Math.min(9, noOfPages);

  const renderPagination = pageNo => {
    let a = [];
    const window_size = (paginationLength - 3);
    let start = pageNo - (window_size / 2 >> 0);
    let j = Math.min(Math.max(start, 2), noOfPages - window_size - 1);
    for (let i = 1; i <= paginationLength; i++)
      if (i === 1)
        a.push(1)
      else if (i === 2 && j > 2){
        a.push(-1);
        j++;
      }
      else if (i === paginationLength)
        a.push(noOfPages)
      else if (i === paginationLength - 1 && j < noOfPages - 1)
        a.push(-1)
      else
        a.push(j++);
    return a;
  };

  return (
    <Pagination 
      className="justify-content-center" 
      size='sm'
    >
      <Pagination.First onClick={() => setPageNo(1)}/>
      <Pagination.Prev onClick={
        () => setPageNo(pageNo > 1 ? pageNo - 1 : 1)
      }/>
      {renderPagination(pageNo).map(page => (page !== -1) ? 
        <Pagination.Item 
          key={page} 
          active={page === pageNo}
          onClick={() => setPageNo(page)}
        >
          {page}
        </Pagination.Item> :
        <Pagination.Ellipsis disabled/>
      )}
      <Pagination.Next onClick={
        () => setPageNo(pageNo < noOfPages ? pageNo + 1 : noOfPages)
      }/>
      <Pagination.Last onClick={() => setPageNo(noOfPages)}/>
    </Pagination>
  );
}
export default ProductPagination;
