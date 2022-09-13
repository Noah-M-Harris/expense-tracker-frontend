import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import DashboardData from "../Users/Dashboard/DashboardData";
import LoadingComponent from "../../components/Loading/Loading";


import { fetchAccountStats } from "../../redux/slices/accountStats/accountStatsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStats());
  }, [dispatch]);

  const account = useSelector(state => state.account); 

  const {isLoading, isAppErr, isServerErr, accountDetails} = account

  const exp = accountDetails?.expenseStats[0]
  const inc = accountDetails?.incomeStats[0]

  return (
    <>

      {isLoading ? (
        <LoadingComponent />
      ) : isAppErr || isServerErr ? (
        <div class="alert alert-danger" role="alert">
          {isServerErr} {isAppErr}
        </div>
      ) : (
        <>
          <DashboardData
            numOfTransExp={exp?.totalRecords}
            avgExp={exp?.averageExp}
            totalExp={exp?.totalExp}
            minExp={exp?.minExp}
            maxExp={exp?.maxExp}
            numOfTransInc={inc?.totalRecords}
            avgInc={inc?.averageInc}
            totalInc={inc?.totalInc}
            minInc={inc?.minInc}
            maxInc={inc?.maxInc}
            netProfit={stats?.profit}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
