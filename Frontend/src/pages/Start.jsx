import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1702999138163-ee2d1d8707e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHRyYWZmaWMlMjBsaWdodHN8ZW58MHx8MHx8fDA%3D)] h-screen pt-8 w-ful flex justify-between
        flex-col"
      >
        <img
          className="w-20 ml-8"
          src="https://www.edigitalagency.com.au/wp-content/uploads/Uber-logo-white-png-900x313.png"
          alt=""
        />
        <div className="bg-white py-4 px-4 pb-7  ">
          <h2 className="text-3xl font-bold ">Get Started With Uber</h2>
          <Link to='/login' className="flex items-center justify-center w-full bg-black py-3 text-white rounded mt-5">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
