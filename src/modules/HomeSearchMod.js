import React, { useState } from "react";
import { IconRemoveCom, IconSearchCom } from "../components/icon";

const HomeSearchMod = () => {
  const [isSearch, setIsSearch] = useState(false);
  return (
    <div className="c-search relative z-50">
      <div className="bg-tw-light rounded-full shadow-primary p-2 w-full flex items-center">
        <div className="flex-1 px-2">
          <input
            type="text"
            placeholder="Search course, video, blog..."
            className="bg-transparent text-sm placeholder:text-gray-400 text-black w-full pl-3 py-2 rounded-full outline-none"
          />
        </div>
        <button className={`w-[72px] h-10 rounded-full text-tw-light tw-transition-all flex items-center justify-center flex-shrink-0 hover:opacity-60 ${isSearch ? "bg-tw-light-pink" : "bg-primary"}`}>
          {/* Xứ lý nếu có search thì hiện Icon Remove + style text-tw-danger hoặc bg-tw-orange */}
          
          {isSearch ? <IconRemoveCom></IconRemoveCom> : <IconSearchCom></IconSearchCom>}
        </button>
      </div>
      {isSearch && (
        <div className="c-search-result w-full sm:w-[600px] bg-white absolute top-full left-0  lg:left-[-15%] translate-y-5 z-50 rounded-lg">
          <div className="flex items-center justify-between px-6 py-[0.5rem] bg-gray-200 rounded-lg">
            <h4 className="font-medium text-sm text-tw-light-pink">
              See all 19,0298 results
            </h4>
            <button className="flex items-center justify-center w-16 h-11">
              {/* <IconRemoveCom></IconRemoveCom> */}
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-y-5 mb-6">
              <SearchItem></SearchItem>
              <SearchItem></SearchItem>
              <SearchItem></SearchItem>
            </div>
            <h3 className="text-sm font-semibold mb-[1rem]">Related results</h3>
            <div className="flex flex-col gap-y-3">
              <p>
                <strong>Programming</strong> What is Web3, how does NFT work ?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SearchItem = () => (
  <div className="c-search-item flex items-center gap-x-5">
    <img
      srcSet="https://media.istockphoto.com/id/1389950296/photo/web3-next-generation-world-wide-web-blockchain-technology-with-decentralized-information.jpg?b=1&s=170667a&w=0&k=20&c=6TeWE8yepN7Womy-llBSPOiYCXnDCyzbenUOoETfmWc="
      className="w-[50px] h-[50px] object-cover flex-shrink-0 rounded-xl"
      alt="Search Results"
    />
    <div className="flex-1 text-sm">
      <h3 className="mb-[.25rem]">
        <strong>Programming</strong> How to build a Blockchain Web3
      </h3>
      <p className="text-gray-400">By FPT Aptech</p>
    </div>
  </div>
);

export default HomeSearchMod;
