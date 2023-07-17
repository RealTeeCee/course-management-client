import React from "react";
import ScrollToTopCom from "../../components/common/ScrollToTopCom";

const FooterMod = () => {
  return (
    <>
      <ScrollToTopCom />
      <footer className="bg-black text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 pt-3 px-28">
            <img
              className=" w-[200px] object-cover"
              src="/logo_click_light.png"
              alt="Click and Learn Logo"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 px-28 pb-3">
            {/* Column 1 */}
            <div className="md:col-span-1 px-4">
              <h5 className="font-bold mb-4 text-tw-primary">CONTACT US</h5>
              <p className="text-sm mb-2 ">
                <a href="tel: (08)38460801">Phone: (08)38460801</a>
              </p>
              <p className="text-sm mb-2">
                <a href="mailto:contact@clickandlearn.com">
                  Email: contact@clickandlearn.com
                </a>
              </p>
              <p className="text-sm ">
                590 Cach Mang Thang 8, District 3, Ho Chi Minh City
              </p>
            </div>

            {/* Column 2 */}
            <div className="md:col-span-1 px-16 flex flex-col items-center">
              <h5 className="font-bold mb-4 text-tw-primary">SITE MAP</h5>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <ul className="text-sm">
                    <li className="mb-2">
                      <a href="/">Home Page</a>
                    </li>
                    <li className="mb-2">
                      <a href="/blogs">Blogs Page</a>
                    </li>
                    <li className="mb-2">
                      <a href="/authors">Authors Page</a>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul className="text-sm">
                    <li className="mb-2">
                      <a href="/courses">Courses Page</a>
                    </li>
                    <li className="mb-2">
                      <a href="/categories">Categories Page</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="md:col-span-1 px-4">
              <div>
                <h5 className="font-bold mb-4 text-tw-primary">DOWNLOAD NOW</h5>
                <a href="/click_and_learn_app.apk" download>
                  <img
                    className="w-[150px] object-cover transition-transform transform-gpu hover:scale-110 hover:brightness-50"
                    src="/footer_download_android.png"
                    alt="Download Android"
                  />
                </a>
              </div>
            </div>
          </div>
          <hr className="w-150 mt-2 border-b-2 border-white" />
          <div className=" pt-4 pb-10 px-28 text-center">
            <div className="flex items-center justify-center">
              <p className="text-sm mb-2">Copyright © 2023 Click & Learn</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterMod;
