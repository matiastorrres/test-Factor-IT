import { useContext, useState } from "react";
import {  Grid } from "@mui/material";
import { getMonth, parseISO, isSameMonth, subMonths, getYear } from "date-fns";

import { customers } from "../mocks/customers";
import { InfoContext } from "../context/InfoContext";
import CustomTable from "../components/CustomTable";

const Dashboard = () => {
  const [becameVipDate, setBecameVipDate] = useState(null);
  const [leaveVipDate, setLeaveVipDate] = useState(null);
  const [customerbecameVip, setCustomerbecameVip] = useState(null);
  const [customerLeaveVip, setCustomerLeaveVip] = useState(null);

  const { isVip } = useContext(InfoContext);

  const becameVip = (date, type) => {
    const previousMonth = subMonths(date, 1);
    let clientesbecameVip = [];
    let leaveVip = [];
    customers.forEach((customer) => {
      const shoppingHistoryJson = localStorage.getItem(customer.id);
      if (shoppingHistoryJson) {
        const shoppingHistory = JSON.parse(shoppingHistoryJson);
        const filterMonthAndYearPurchases = shoppingHistory?.filter(
          (buy) => {
            const dateBuy = parseISO(buy.date);
            return isSameMonth(dateBuy, date);
          }
        );
        const filterPurchasesFromPreviousMonth = shoppingHistory?.filter((buy) => {
          const dateBuy = parseISO(buy.date);
          return (
            getMonth(dateBuy) === getMonth(previousMonth) &&
            getYear(dateBuy) === getYear(previousMonth)
          );
        });

        const totalAmountPurchasesMonthAndYear =
         filterMonthAndYearPurchases?.reduce(
            (total, item) => total + item.total,
            0
          );
        const totalAmountPurchasesPreviousMonth = filterPurchasesFromPreviousMonth?.reduce(
          (total, item) => total + item.total,
          0
        );
        if (
          totalAmountPurchasesPreviousMonth <= 10000 &&
          totalAmountPurchasesMonthAndYear > 10000
        )
          clientesbecameVip.push(customer);
        if (
          totalAmountPurchasesPreviousMonth > 10000 &&
          totalAmountPurchasesMonthAndYear <= 10000
        )
          leaveVip.push(customer);
      }
    });
    if (type === "leaveVip") {
      setLeaveVipDate(date);
      return setCustomerLeaveVip(leaveVip);
    } else {
      setBecameVipDate(date);
      return setCustomerbecameVip(clientesbecameVip);
    }
  };

  const getClientesVip = () => {
    return customers.filter((customer) => isVip(customer));
  };

  return (
    <Grid>

      <CustomTable title="This month's VIP clients" data={getClientesVip()} />

      <CustomTable
        title="Consult clients who stopped being VIP"
        data={customerLeaveVip}
        actionHeader
        dateStatus={leaveVipDate}
        handleChangesDateStatus={(date) => becameVip(date, "leaveVip")}
      />

      <CustomTable
        title="Consult clients who became VIP"
        data={customerbecameVip}
        actionHeader
        dateStatus={becameVipDate}
        handleChangesDateStatus={(date) => becameVip(date, "becameVip")}
      />
    </Grid>
  );
};

export default Dashboard;
