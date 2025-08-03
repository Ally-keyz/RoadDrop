import BottomNavbar from "./NavBar";

function Welcome() {
  return (
    <div className="relative w-full h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/background.jpg")' }}
      ></div>

      {/* Color overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-slate-500/80 opacity-80"></div>

      {/* Content */}
      <div className="relative z-10">
        <BottomNavbar />
      </div>
    </div>
  );
}

export default Welcome;
