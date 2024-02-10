/* eslint-disable react/prop-types */
const Card = ({ image, heading }) => {
  return (
    <div
      style={{
        background: "#e7e7e7",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      }}
      className="rounded-lg overflow-hidden mx-4"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <img className="object-cover h-48 w-full" src={image} alt="" />
        </div>
        <div className="min-h-14 my-4 mx-2">
          <h3
            style={{ color: "#004680" }}
            className="text-base md:text-lg font-bold text-center"
          >
            {" "}
            {heading}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
