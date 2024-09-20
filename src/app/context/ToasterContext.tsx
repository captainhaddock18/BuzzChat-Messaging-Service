"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        className: "bg-lightgray text-gray-200",
      }}
    />
  );
};

export default ToasterContext;
