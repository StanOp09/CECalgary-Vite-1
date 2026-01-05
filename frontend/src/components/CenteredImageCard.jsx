const CenteredImageCard = ({ imageSrc }) => {
  return (
    <div className="max-w-5xl w-full mx-auto mt-6 sm:mt-10 rounded-2xl shadow-lg overflow-visible">
      <div
        className="w-full aspect-[3/2] sm:aspect-[16/9] md:aspect-[3/2] rounded-2xl bg-bottom bg-cover"
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>
    </div>
  );
};

export default CenteredImageCard;
