import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BloodRequests() {
  const [requests, setRequests]         = useState([]);
  const [page, setPage]                 = useState(1);
  let headers = {
    token                               : localStorage.getItem("userToken"),
  };
  async function getAllBloodReq() {
    let { data }                        = await axios
      .get(`http://localhost:8080/api/v1/blood`)
      .catch((err) => {
        console.log("err", err);
      });
    console.log("req", data.Blood);
    setRequests(data);
  }
  async function handleDonation(id, state) {
    let { data }                        = await axios
      .put(
        `http://localhost:8080/api/v1/blood/${id}`,
        { approved                      : state },
        { headers                       : headers }
      )
      .catch((err) => {
        console.log("err", err);
      });
    //   console.log("req",data.Blood);
    // setRequests(data);
  }
  function handleRow(id, e) {
    // data.data.results
    Object.values(document.getElementById(id + "row").children).forEach((e) => {
      e.classList.toggle("opacity-50");
    });
    for (let index = 0; index < requests.Blood.length; index++) {
      document.getElementById(index + "row").classList.remove("opacity-50");
      Object.values(document.getElementById(index + "row").children).forEach(
        (e) => {
          e.classList.remove("opacity-50");
        }
      );
      document.getElementById(index)?.classList.replace("d-block", "d-none");
    }
    document.getElementById(id).classList.replace("d-none", "d-block");
    Object.values(document.getElementById(id + "row").children).forEach((e) => {
      e.classList.add("opacity-50");
    });
    document
      .getElementById(id + "row")
      .lastElementChild.classList.add("opacity-100");
    // e.target.parentElement.classList.add('opacity-50')
    // console.log(document.getElementById(id+'row'));
  }
  var handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    getAllBloodReq();
  }, [handleDonation]);
  return (
    <>
      <div className                    = {`container   `}>
        <h3 className                   = "py-4">Blood Requests</h3>
        <div className                  = "row  text-center mb-0 pb-0">
          <div className                = "col-md-3 border  border-dark-subtle  fw-bold  p-0">
            Id
          </div>
          <div className                = "col-md border  border-dark-subtle  fw-bold  p-0">
            Donor Name
          </div>
          <div className                = "col-md-2 border  border-dark-subtle fw-bold  p-0">
            National Id
          </div>
          <div className                = "col-md-1 border  border-dark-subtle fw-bold  p-0">
            Blood type
          </div>
          <div className                = "col-md-1 border  border-dark-subtle  fw-bold  p-0">
            City
          </div>

          <div className                = "col-md-1 border  border-dark-subtle  fw-bold  p-0">
            Approved
          </div>
          <div className                = "col-md-1 border  border-dark-subtle  fw-bold  p-0">
            Virus test
          </div>
        </div>
      </div>
      <div id                           = "rowContainer" className={`container cursor-pointer    `}>
        {requests
          ? requests?.Blood?.map((item, index) => (
              <div
                key                     = {item._id}
                id                      = {index + "row"}
                onClick                 = {(e) => handleRow(index, e)}
                onBlur                  = {(e) => e.target.style.removeProperty("backgroundColor")}
                className               = "row  position-relative fw-semibold text-center cursor-pointer"
              >
                <div className          = "col-md-3 border  border-dark-subtle py-1  p-0">
                  {item._id}
                </div>
                <div className          = "col-md border  border-dark-subtle   p-0">
                  {item.donor.name}
                </div>
                <div className          = "col-md-2 border  border-dark-subtle text-uppercase  p-0">
                  {item.donor.nationalId}
                </div>
                <div className          = "col-md-1 border  border-dark-subtle text-uppercase  p-0">
                  {item.type}
                </div>

                <div className          = "col-md-1 border  border-dark-subtle   p-0">
                  {item.city}
                </div>

                <div className          = "col-md-1 border  border-dark-subtle   p-0">
                  {item?.approved === true ? "approved" : ""}
                  {item?.approved === false ? "rejected" : ""}
                  {item.approved}
                </div>
                <div className          = "col-md-1 border  border-dark-subtle   p-0">
                  {item?.virusTest === false ? "Negative" : ""}
                  {item?.virusTest === true ? "Positive" : ""}
                </div>

                <div
                  id                    = {index}
                  className             = "row d-flex justify-content-between align-items-center d-none position-absolute top-0 start-0 end-0 pt-1 opacity-100"
                >
                  <div className        = "col-md-2">
                    <button
                      className         = "ms-auto bg-success px-2   border-0   rounded"
                      onClick           = {() => handleDonation(item._id, true)}
                    >
                      Approve
                    </button>
                  </div>
                  <div className        = "col-md-2">
                    <button className   = "ms-auto bg-main px-2   border-0  rounded">
                      show details
                    </button>
                  </div>
                  <div className        = "col-md-2">
                    <button
                      className         = "ms-auto bg-danger px-2   border-0  rounded"
                      onClick           = {() => handleDonation(item._id, false)}
                    >
                      Reject
                    </button>
                  </div>
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
                onChange                = {handleChangePage}
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
