// const CenteredImageCard = ({ imageSrc }) => {
//   return (
//     <div className="max-w-3xl w-full mx-auto mt-10 rounded-2xl shadow-lg overflow-hidden">
//       <div
//         className="w-full h-96 rounded-2xl"
//         style={{
//           backgroundImage: `url(${imageSrc})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default CenteredImageCard;

// const CenteredImageCard = ({ imageSrc }) => {
//   return (
//     <div className="max-w-3xl w-full mx-auto mt-6 sm:mt-10 rounded-2xl shadow-lg overflow-hidden">
//       <div
//         className="w-full h-64 sm:h-80 md:h-96 rounded-2xl"
//         style={{
//           backgroundImage: `url(${imageSrc})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default CenteredImageCard;

const CenteredImageCard = ({ imageSrc }) => {
  return (
    <div className="max-w-3xl w-full mx-auto mt-6 sm:mt-10 rounded-2xl shadow-lg overflow-visible">
      <div
        className="w-full aspect-[3/2] sm:aspect-[16/9] md:aspect-[3/2] rounded-2xl bg-center bg-cover"
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>
    </div>
  );
};

export default CenteredImageCard;
