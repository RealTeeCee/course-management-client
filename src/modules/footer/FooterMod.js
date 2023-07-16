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
              // className="h-14 mb-4"
              className=" w-[200px] object-cover"
              src="/logo_click_light.png"
              alt="Click and Learn Logo"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 pb-10 px-28">
            {/* Column 1 */}
            <div className="md:col-span-1 px-4">
              <h5 className="font-bold mb-4 text-indigo-600">CONTACT US</h5>
              <p className="text-sm mb-2">Phone: (08)38460801</p>
              <p className="text-sm mb-2">Email: contact@clickandlearn.com</p>
              <p className="text-sm ">
                590 Cach Mang Thang 8, District 3, Ho Chi Minh City
              </p>
            </div>

            {/* Column 2 */}
            <div className="md:col-span-1 px-16 flex justify-center">
              <div>
                <h5 className="font-bold mb-4 text-indigo-600">SITE MAP</h5>
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
                  <li className="mb-2">
                    <a href="/courses">Courses Page</a>
                  </li>
                
                  <li className="mb-2">
                    <a href="/categories">Categories Page</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 3 */}
            <div className="md:col-span-1 px-4 flex justify-center">
              <div>
              <h5 className="font-bold mb-4 text-indigo-600">DOWNLOAD NOW</h5>
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
        </div>
      </footer>
    </>
  );
};

export default FooterMod;
