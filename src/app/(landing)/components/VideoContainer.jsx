
const VideoContainer = () => {
  return (
    <>
      <div
        style={{ backgroundColor: "#004680" }}
        className="video-height relative overflow-hidden"
      >
        <video
          className="w-full h-full object-cover"
          preload="none"
          autoPlay
          loop
          playsInline
          muted
          src="/Avitahealthcare.mp4"
        ></video>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-opacity-50">
          <h1 className="text-sm sm:text-base md:text-lg lg:text-3xl mb-4 text-shadow text-center">
            Bringing Care to You, Anytime, Anywhere.
          </h1>
        </div>
      </div>
    </>
  );
};

export default VideoContainer;
