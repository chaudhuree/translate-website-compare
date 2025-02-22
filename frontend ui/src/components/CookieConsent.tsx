"use client";
import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (!accepted) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full dark:bg-white dark:text-black bg-gray text-black p-4 text-center shadow-md">
      <p className="mb-2">
        We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
