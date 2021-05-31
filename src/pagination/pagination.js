import React, { useEffect, useRef, useState } from "react";
import { paginationService } from "./pagination.service";
import axiosInstance from "../http/httpInstance";

import './pagination.css';

/*
 * Type definitions
 */

/*
 * Pagination with props
 */
export const Pagination = ({
  apiRoute,
  recordsPerPage = 5,
  responseData,
  isLoadingData,
  reloadApi,
  search,
  isSearchingData,
}) => {
  // Hooks
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pager, setPager] = useState({});
  const [totalRecordsPage, setTotalRecordsPage] = useState(0);
  const currentPageRef = useRef(1);

 

  /*
   * Fetch data from API
   * Append query params if any
   * API call with GET
   */
  const getData = (pageNumber) => {
    isLoadingData(true);
    setCurrentPage(Number(pageNumber));

    let finalApiRoute = `${apiRoute}?page=${pageNumber}&limit=${recordsPerPage}&searchTerm=${
      search.term || ""
    }`;
    axiosInstance
      .get(finalApiRoute)
      .then((response) => {
        isLoadingData(false);
        isSearchingData(false);
        setTotalCount(response.data.total);
        responseData(response.data.data);
        setTotalRecordsPage(Math.ceil(response.data.total / recordsPerPage));
        setPagination(response.data.total, pageNumber, recordsPerPage);
      })
      .catch((error) => {
        isLoadingData(false);
        isSearchingData(false);
      });
  };

  /*
   * Set pagination data and pager data
   */
  const setPagination = (
    totalCount,
    pageNumber,
    recordsPerPage
  ) => {
    const pData = paginationService.getPager(
      totalCount,
      pageNumber,
      recordsPerPage
    );
    console.log('pData ', pData)
    setPager({ ...pData });

  };

  /*
   * Watch reloadApi flag
   */
  useEffect(() => {
    if (reloadApi) {
      getData(currentPage);
    }
  }, [reloadApi]);

  /*
   * Component initiated
   */
  useEffect(() => {
    getData(currentPage);
  }, []);

  /*
   * Watch current page
   */
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  /*
   * Watch search
   */
  useEffect(() => {
    if (search && search.term) {
      isSearchingData(true);
      getData(currentPage);
    }
  }, [search]);

  /*
   * Watch recordsPerPage
   */
  useEffect(() => {
    getData(currentPage);
  }, [recordsPerPage]);

  /*
   * Render
   */
  return (
    <div>
      {totalCount > 0 && (
        <div className="pagination table-footer d-flex justify-content-between align-items-center">
          <div className="records-count d-sm-block d-none text-secondary">
            Showing {pager && pager.startIndex + 1} to {pager && pager.endIndex + 1} of{" "}
            
            {totalCount} records
          </div>
          <nav className="pages">
            <ul className="pagination">
              <button
                className={
                  currentPage === 1 ? "disabled page-item" : "page-item"
                }
              >
                <a
                  href="#!"
                  className="page-link"
                  onClick={(e) => {
                    e.preventDefault();
                    getData(currentPageRef.current - 1);
                  }}
                >
                  Previous
                </a>
              </button>
              {pager.pages &&
                pager.pages.map((page, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        currentPage === page
                          ? "custom-disabled active page-item"
                          : "page-item"
                      }
                    >
                      <a
                        className="page-link"
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          getData(page);
                        }}
                      >
                        {page}
                      </a>
                    </li>
                  );
                })}
              <button
                className={
                  currentPage + 1 > totalRecordsPage
                    ? "disabled page-item"
                    : "page-item"
                }
              >
                <a
                  className="page-link"
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    getData(currentPageRef.current + 1);
                  }}
                >
                  Next
                </a>
              </button>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};