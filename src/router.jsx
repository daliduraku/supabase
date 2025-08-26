import Signin from "./components/Signin";
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";
import Signup from "./components/Signup";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
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
]);
