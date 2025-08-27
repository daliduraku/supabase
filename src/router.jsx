import Signin from "./components/Signin";
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";
import Signup from "./components/Signup";
import { createBrowserRouter } from "react-router-dom";
import RootRedirect from "./routes/RootRedirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);
