import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AppPagination from "../../components/AppPagination";

import { fetchAllExpenses } from "../../redux/slices/expenses/expensesSlice";

import ContentDetails from '../../components/ContentDetails/ContentDetails'


const ExpensesList = () => {

  const dispatch = useDispatch()

  // Keep Track of our pages: Default to Page 1
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchAllExpenses(+page))
  }, [dispatch, page, setPage])

// Get all expenses from the store
const allExpenses = useSelector(state => state?.expenses)

// Destructuring expenses
const {expLoading, expAppErr, expServerErr, expenseList} = allExpenses
  return (
    <>
      {expLoading ? (
        <LoadingComponent />
      ) : expAppErr || expServerErr ? (
        <ErrorDisplayMessage>
          {" "}
          {expServerErr}
          {expAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">
              <a
                className="position-absolute top-0 end-0 mt-4 me-4"
                href="#"
              ></a>
              <div className="pt-8 px-8 mb-8">
                <h6 className="mb-0 fs-3">Recent Expense transactions</h6>
                <p className="mb-0">
                  Below is the history of your expense transactions records
                </p>
                <Link
                  to="/add-expense"
                  className="btn  btn-outline-danger me-2 m-2"
                >
                  New Expense
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Withdrawed By</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Title</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Description</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Amount</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Date</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Action</small>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {expenseList?.length <= 0 ? (
                      <h2>No Expense Found</h2>
                    ) : (
                      expenseList?.docs?.map(exp => (
                        <ContentDetails item={exp} key={exp?._id} />
                      ))
                    )}
                  </>
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {expenseList?.docs?.length > 1 && (
              <AppPagination
                setPage={setPage}
                pageNumber={expenseList?.totalPages}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ExpensesList;
