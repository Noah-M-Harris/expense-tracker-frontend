import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";


import { userProfileAction } from "../../../redux/slices/users/userSlice";
import calculateTransaction from "../../../utils/accountStatistics";
import DataGrap from '../Dashboard/DataGrap'
import {UserProfileStats} from './UserProfileStats' 

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(userProfileAction())
  }, [dispatch])

  const user = useSelector(state => state.users)
  const {ServerErr, AppErr, Loading, profile} = user


  // Recieve income statistics
  const incomeRes = profile?.income && calculateTransaction(profile?.income)

  // Recieve expense statistics
  const expenseRes = profile?.expenses && calculateTransaction(profile?.expenses)


  return (
        <section className="py-5">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <div className="d-flex mb-6 align-items-center">
                <img
                  className="img-fluid me-4 rounded-2"
                  //   style="width: 64px; height: 64px;"
                  src="https://images.unsplash.com/photo-1593789382576-54f489574d26?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=faces&amp;cs=tinysrgb&amp;fit=crop&amp;h=128&amp;w=128"
                  alt=""
                />
                <div>
                  <h6 className="fw-bold mb-0">
                    <span>{profile?.firstName} {profile?.lastName}</span>
                    <span className="badge ms-2 bg-primary-light text-primary">
                      {profile?.expenses?.length + profile?.income?.length}{" "}
                      Records Created
                    </span>
                  </h6>
                  {<p className="mb-0">{profile?.email}</p>}
                  <p className="mb-0"></p>
                  {/* <p className="mb-0">Date Joined: 12-Jan-1999</p> */}
                  <button
                    className="btn"
                  >
                    Edit Profile
                    <i class="bi bi-pen fs-3 m-3 text-primary"></i>
                  </button>
                </div>
                <DataGrap
                  income={incomeRes?.sumTotal}
                  expenses={expenseRes?.sumTotal}
                />
              </div>

              <p className="mb-8"> </p>

              <UserProfileStats
                numOfTransExp={profile?.expenses?.length}
                avgExp={expenseRes?.avg}
                totalExp={expenseRes?.sumTotal}
                minExp={expenseRes?.min}
                maxExp={expenseRes?.max}
                numOfTransInc={profile?.income?.length}
                avgInc={incomeRes?.avg}
                totalInc={incomeRes?.sumTotal}
                minInc={incomeRes?.min}
                maxInc={incomeRes?.max}
              />
              <div className="d-flex align-items-center justify-content-center">
                <button
                  onClick={() => navigate('/user-expenses')}
                  className="btn me-4 w-100 btn-danger d-flex align-items-center justify-content-center"
                >
                  <span>View Expenses History</span>
                </button>
                <button
                  onClick={() => navigate('/user-income')}
                  className="btn w-100 btn-outline-success d-flex align-items-center justify-content-center"
                >
                  <span>View Income History</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

export default Profile;
