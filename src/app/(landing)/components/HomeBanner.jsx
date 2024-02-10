import bbanner from "../assets/bbanner.webp";
import largeBanner from "../assets/banner2.webp";

const HomeBanner = () => {
  return (
    <>
      {/* mobile */}
      <div className="lg:hidden relative text-center text-white">
        <img src={bbanner.src} alt="" />
        <div
          style={{ background: "#004680" }}
          className="relative right-auto bottom-auto px-1 py-4 transform-none w-full"
        >
          <h2 className="mb-4 font-bold heading2-mobile">
            Avita Health Donation
          </h2>
          <p className="mb-4">
            Empower health and inspire hope with Avita- Your partner in
            fostering wellness through impactful donations
          </p>
          <button
            className="inline-block border-4 border-white rounded-lg bg-transparent px-4 py-1.5 text-lg"
            disabled={true}
          >
            Coming Soon!
          </button>
        </div>
      </div>

      {/* desktop */}
      <div className="hidden lg:block relative text-center text-white">
        {/* Image Container */}
        <div className="relative">
          <img className="object-cover w-full" src={largeBanner.src} alt="" />

          {/* Overlay Div */}
          <div
            style={{ background: "#004680" }}
            className="absolute inset-0 opacity-75"
          ></div>

          {/* Text and Button */}
          <div className="absolute text-center bottom-1/2 translate-y-1/2 w-full right-auto py-8">
            <h2 className="text-size font-bold mb-6 relative z-10">
              Avita Health Donation
            </h2>
            <p className="mb-4">
              Empower health and inspire hope with Avita- Your partner in
              fostering wellness through impactful donations
            </p>
            <button
              disabled={true}
              className="inline-block border-4 border-white rounded-lg text-a text-padding bg-transparent mb-3"
            >
              Coming Soon!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
