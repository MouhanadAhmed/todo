import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Todolist.css";

export default function Todolist() {
  const [requests, setRequests]         = useState([]);
  const [page, setPage]                 = useState(1);
  let headers = {
    token                               : localStorage.getItem("userToken"),
  };
  async function getAllLists() {
    let { data }                        = await axios
      .get(`http://localhost:8080/api/v1/list`)
      .catch((err) => {
        console.log("err", err);
      });
    console.log("req", data);
    const { Lists, count, pages } = data.result;
    setRequests(Lists);
    setPage(pages);
  }
  async function getItems(id) {
    let { data }                        = await axios
      .put(
        `http://localhost:8080/api/v1/item/${id}`
      )
      .catch((err) => {
        console.log("err", err);
      });
      console.log("req",data);
    // setRequests(data);
  }
  async function handleItem(id) {
    let { data }                        = await axios
      .put(
        `http://localhost:8080/api/v1/item/${id}`
      )
      .catch((err) => {
        console.log("err", err);
      });
      console.log("req",data);
    // setRequests(data);
  }
  useEffect(() => {
    getAllLists();
  }, []);
  return (
    <>
      <div className                    = {`container   `}>
        <h3 className                   = "py-4">Todo list </h3>
        <div className                  = "row  text-center mb-0 pb-0">
          <div className                = "col-md-3 border  border-dark-subtle  fw-bold  p-0">
            Id
          </div>
          <div className                = "col-md border  border-dark-subtle  fw-bold  p-0">
            Name
          </div>
        </div>
      </div>
      <div id                           = "rowContainer" className={`container cursor-pointer    `}>
        {requests
          ? requests?.map((item, index) => (
              <div
                key                     = {item._id}
                id                      = {index + "row"}
                // onClick                 = {(e) => handleRow(index, e)}
                onBlur                  = {(e) => e.target.style.removeProperty("backgroundColor")}
                className               = "row  position-relative fw-semibold text-center cursor-pointer"
              >
                <div className          = "col-md-3 border  border-dark-subtle py-1  p-0">
                  {item._id}
                </div>
                <div className          = "col-md border  border-dark-subtle   p-0">
                  {item.name}
                </div>
              </div>
            ))
            : ""}
      </div>
      {Math.ceil(requests.count / 10) > 1 ? (
        <>
          <div className                = "col-12 pt-4 d-flex justify-content-center mb-5">
            <Stack spacing              = {2}>
              <Pagination
                dir                     = "auto"
                count                   = {Math.ceil(requests.count / 12)}
                page                    = {page}
                // onChange                = {handleChangePage}
                variant                 = "outlined"
                shape                   = "rounded"
                showFirstButton
                showLastButton
              />
            </Stack>
          </div>
        </>
      )                                 : (
        ""
      )}
    </>
  );
}
