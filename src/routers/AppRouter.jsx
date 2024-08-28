import React from 'react';
import {
  Route,
  redirect,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from 'axios';
import { ThemeProvider } from 'src/components/Theme';
import { tokenLogin } from 'src/components/TokenLogin';
import App from 'src/App';
import Public from 'src/routers/Public';
import Private from 'src/routers/Private';
import Error from 'src/components/Error';
import LoginPage from 'src/pages/LoginPage';
import RegisterPage from 'src/pages/RegisterPage';
import DashboardPage from 'src/pages/DashboardPage';
import ContainerPage from 'src/pages/ContainerPage';
import TruckPage from 'src/pages/TruckPage';
import DailyPage from 'src/pages/DailyPage';
import ClampingPage from 'src/pages/ClampingPage';
import InvoicingPage from 'src/pages/InvoicingPage';
import PaymentPage from 'src/pages/PaymentPage';
import MaintainerPage from 'src/pages/MaintainerPage';
import OrderPage from 'src/pages/OrderPage';
import AnalysisPage from 'src/pages/AnalysisPage';
import MailPage from 'src/pages/MailPage';
import StoragePage from 'src/pages/StoragePage';
import InventoryPage from 'src/pages/InventoryPage';
import ReleasePage from 'src/pages/ReleasePage';
import DataPage from 'src/pages/DataPage';
import PartnercompanyPage from 'src/pages/PartnercompanyPage';
import CustomerPage from 'src/pages/CustomerPage';
import DBPage from 'src/pages/DBPage';
import MonthlyCustomerPage from 'src/pages/MonthlyCustomerPage';

axios.defaults.baseURL = process.env.REACT_API_BASE_URL;

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<App />} errorElement={<Error />}>
          <Route element={<Private />} loader={async () => {
            const tokenData = await tokenLogin();
            return { tokenData };
          }}>
            <Route path="/" loader={() => redirect('/dashboard')} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/container" element={<ContainerPage />} />
            <Route path="/truck" element={<TruckPage />} />
            <Route path="/daily" element={<DailyPage />} />
            <Route path="/clamping" element={<ClampingPage />} />
            <Route path="/invoicing" element={<InvoicingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/maintainer" element={<MaintainerPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/mail" element={<MailPage />} />
            <Route path="/storage" element={<StoragePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/release" element={<ReleasePage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/partner" element={<PartnercompanyPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/month" element={<MonthlyCustomerPage />} />
          </Route>
        </Route>
        <Route element={<Public />} errorElement={<Error />} loader={async () => {
          const tokenData = await tokenLogin();
          return { tokenData };
        }}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        {/* <Route path="*" loader={() => redirect('/login')} /> */}
      </>
    )
  );

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default AppRouter;