
function TopNav() {
  return (
    <div className="flex relative top-5 justify-end p-3">
      <button className=" py-3 px-5   rounded-lg backdrop-blur-md shadow-sm bg-orange-600/70 text-white text-[14px] font-sans">
        Sign in
      </button>
    <button className=" py-3 px-5  rounded-lg backdrop-blur-md shadow-sm bg-blue-600/70 ml-2 text-white text-[14px] font-sans">
        Sign up
      </button>
      <div className="p-4 rounded-full top-[-1px]  bg-gray-100 backdrop-blur-sm absolute"></div>
    </div>
  )
}

export default TopNav