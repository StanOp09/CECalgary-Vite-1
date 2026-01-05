const CenteredVideoCard = ({ videoSrc, poster }) => {
  return (
    <div className="max-w-5xl w-full mx-auto mt-6 sm:mt-10 rounded-2xl shadow-lg overflow-hidden bg-black">
      <div className="w-full aspect-[3/2] sm:aspect-[16/9] md:aspect-[3/2] flex items-center justify-center">
        <video
          className="w-full h-full object-contain cursor-pointer"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          onClick={(e) => {
            e.currentTarget.muted = false;
            e.currentTarget.play();
          }}
        />
      </div>
    </div>
  );
};

export default CenteredVideoCard;
