import React from "react";
import "./Pagination.css";

const Pagination = ({ totalPosts, postPerPage, onClick, currentPage }) => {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    page.push(i);
  }
  return (
    <>
      {page.length > 1 && (
        <ul className="pagination">
          {page.map((p) => (
            <li key={p}>
              <button
                className={
                  parseInt(currentPage) == p
                    ? "pagination_button active"
                    : "pagination_button"
                }
                onClick={() => onClick(p)}
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Pagination;
