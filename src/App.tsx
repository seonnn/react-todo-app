import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login, Todo } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
