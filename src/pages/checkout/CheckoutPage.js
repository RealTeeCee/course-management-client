import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonCom } from "../../components/button";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com, HeadingH3Com } from "../../components/heading";
import { InputCom } from "../../components/input";
import { LabelCom } from "../../components/label";
import { TextAreaCom } from "../../components/textarea";

// **** Mui ****
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DividerCom from "../../components/common/DividerCom";
import {
  BASE_API_URL,
  MESSAGE_EMAIL_INVALID,
  MESSAGE_FIELD_REQUIRED,
} from "../../constants/config";
import axios from "axios";
import { toast } from "react-toastify";

const schemaValidation = yup.object().shape({
  first_name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  last_name: yup.string().required(MESSAGE_FIELD_REQUIRED),
  phone: yup.string().required(MESSAGE_FIELD_REQUIRED),
  email: yup
    .string()
    .required(MESSAGE_FIELD_REQUIRED)
    .email(MESSAGE_EMAIL_INVALID),
});

const CheckoutPage = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async (values) => {
    try {
      setIsLoading(!isLoading);
      const res = await axios.post(`${BASE_API_URL}/checkout`, {
        ...values,
      });
      toast.success(`${res.message}`);
      setIsLoading(false);
    } catch (error) {
      toast.error(`${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeadingH1Com>Payment Details</HeadingH1Com>
      <div className="card">
        <form
          className="theme-form"
          onSubmit={handleSubmit(handleSubmitForm)}
          id="form-create"
        >
          <div className="card-body">
            <div className="row">
              <div className="checkout-user-detail col-xl-6 col-sm-12">
                {/* <div className="row">
                  <div className="col-sm-12">
                    <div className="title-box">
                      <h3 className="text-2xl font-bold text-[#444] pb-[1.25rem]">
                        Customer Details
                      </h3>
                      <hr className="text-gray-400"></hr>
                    </div>
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom> */}
                <div className="row">
                  <div className="col-sm-6">
                    <LabelCom htmlFor="first_name" isRequired>
                      First Name
                    </LabelCom>
                    <InputCom
                      type="text"
                      control={control}
                      name="first_name"
                      register={register}
                      placeholder="First Name"
                      errorMsg={errors.first_name?.message}
                    ></InputCom>
                  </div>
                  <div className="col-sm-6">
                    <LabelCom htmlFor="last_name" isRequired>
                      Last Name
                    </LabelCom>
                    <InputCom
                      type="text"
                      control={control}
                      name="last_name"
                      register={register}
                      placeholder="Last Name"
                      errorMsg={errors.last_name?.message}
                    ></InputCom>
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
                  <div className="col-sm-6">
                    <LabelCom htmlFor="phone" isRequired>
                      Phone
                    </LabelCom>
                    <InputCom
                      type="text"
                      control={control}
                      name="phone"
                      register={register}
                      placeholder="0902xxxxxx"
                      errorMsg={errors.phone?.message}
                    ></InputCom>
                  </div>
                  <div className="col-sm-6">
                    <LabelCom htmlFor="email" isRequired>
                      Email Address
                    </LabelCom>
                    <InputCom
                      type="text"
                      control={control}
                      name="email"
                      register={register}
                      placeholder="test123@gmail.com"
                      errorMsg={errors.email?.message}
                    ></InputCom>
                  </div>
                </div>
                <GapYCom className="mb-3"></GapYCom>
                <div className="row">
                  <div className="col-sm-12">
                    <LabelCom htmlFor="description">Noted</LabelCom>
                    <TextAreaCom
                      name="description"
                      control={control}
                      register={register}
                      placeholder="Write your noted..."
                    ></TextAreaCom>
                  </div>
                </div>
              </div>
              <div className="checkout-order-detail col-xl-6 col-sm-12">
                <div className="checkout-details">
                  <div className="order-box">
                    <div className="title-box">
                      <div className="checkbox-title">
                        <h4>Course</h4>
                        <span>Total</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <HeadingH3Com className="bg-gradient-to-r from-tw-light-pink to-tw-primary bg-clip-text text-transparent hover:text-black flex-1">
                        Become Master PHP
                      </HeadingH3Com>
                      <span>$300</span>
                    </div>
                    <DividerCom></DividerCom>
                    {/* <ul className="qty">
                      <li>
                        <h3 className="bg-gradient-to-r from-tw-light-pink to-tw-primary bg-clip-text text-transparent !text-lg !font-bold">
                          Become Master PHP
                        </h3>
                        <span>$300</span>
                      </li>
                    </ul> */}
                    {/* <ul className="sub-total">
                      <li>
                        Subtotal <span className="count">$300</span>
                      </li>
                    </ul> */}
                    <ul className="sub-total total">
                      <li className="!font-bold">
                        Total <span className="count !font-bold">$300</span>
                      </li>
                    </ul>
                    <div className="animate-chk">
                      <div className="row">
                        <div className="col">
                          {/* Radio Group Checkout Online */}
                          <FormControl>
                            {/* <FormLabel id="payment_method">
                              Payment Methods
                            </FormLabel> */}
                            <LabelCom htmlFor="payment_method">
                              Payment Methods
                            </LabelCom>
                            <RadioGroup
                              id="payment_method"
                              aria-labelledby="payment_method"
                              defaultValue="banking"
                              name="radio-buttons-group"
                            >
                              <FormControlLabel
                                value="banking"
                                control={<Radio style={{ color: "#7366ff" }} />}
                                label="Banking"
                              />
                              <FormControlLabel
                                value="momo"
                                control={<Radio style={{ color: "#7366ff" }} />}
                                label="MOMO"
                              />
                            </RadioGroup>
                          </FormControl>
                          {/* <label className="d-block" htmlFor="edo-ani">
                            <input
                              className="radio_animated"
                              id="edo-ani"
                              type="radio"
                              name="rdo-ani"
                              checked=""
                              data-original-title=""
                              title=""
                              data-bs-original-title=""
                            />
                            Check Payments
                          </label>
                          <label className="d-block" htmlFor="edo-ani1">
                            <input
                              className="radio_animated"
                              id="edo-ani1"
                              type="radio"
                              name="rdo-ani"
                              data-original-title=""
                              title=""
                              data-bs-original-title=""
                            />
                            Cash On Delivery
                          </label>
                          <label className="d-block" htmlFor="edo-ani2">
                            <input
                              className="radio_animated"
                              id="edo-ani2"
                              type="radio"
                              name="rdo-ani"
                              checked=""
                              data-original-title=""
                              title=""
                              data-bs-original-title=""
                            />
                            PayPal
                            <img
                              className="img-paypal"
                              src="../assets/images/checkout/paypal.png"
                              alt=""
                            />
                          </label> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer flex justify-end gap-x-5">
            <ButtonCom type="submit" isLoading={isLoading}>
              Continue
            </ButtonCom>
            {/* <ButtonCom backgroundColor="danger" type="reset">
              Cancel
            </ButtonCom> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
