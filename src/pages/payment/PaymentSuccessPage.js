import React from "react";
import { Link } from "react-router-dom";
import ButtonBackCom from "../../components/button/ButtonBackCom";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com, HeadingH2Com } from "../../components/heading";

const PaymentSuccessPage = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1Com>Payment</HeadingH1Com>
        <ButtonBackCom></ButtonBackCom>
      </div>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header py-3">
              <HeadingH2Com className="text-tw-light-pink text-center">
                Payment Success
              </HeadingH2Com>
            </div>
            <div className="card-body gap-x-4">
              <div className="text-center mx-auto">
                <div>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/002/743/514/original/green-check-mark-icon-in-a-circle-free-vector.jpg"
                    alt="Payment success"
                    className="object-cover w-20 mx-auto"
                  />
                </div>
                <HeadingH2Com>Thank You</HeadingH2Com>
                <p className="text-xl">
                  Payment Is Successfully Processsed{" "}
                  <Link to="/" className="text-tw-success">
                    Click & Learn this course now
                  </Link>
                </p>
                <p>Your Transaction ID: 267676GHERT105467</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
