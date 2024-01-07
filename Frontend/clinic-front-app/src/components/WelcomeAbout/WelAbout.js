import React from "react";
import "./WelAbout.css";

function WelAbout() {
  return (
    <div>
      <div class="container-fluid bg-primary py-5 hero-header-about mb-5">
        <div class="row py-3">
          <div class="col-12 text-center">
            <h1 class="display-3 text-white animated aboutus">Welcome</h1>
            <a href="/" class="h4 text-white word">
              Home
            </a>
            <i class="far fa-circle text-white px-2"></i>
            <a href="about" class="h4 text-white word">
              About
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelAbout;
