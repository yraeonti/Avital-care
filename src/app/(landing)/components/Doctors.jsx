import { useRef, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Select from "react-select";
import avita from "../assets/av4.png";
import doctorPic from "../assets/telehealth.jpg";
import useDoctors from "../hooks/useDoctors";
import useSpecialties from "../hooks/useSpecialties";

const Doctors = () => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const { data: doctors, isLoading } = useDoctors();
  const { data: specialties } = useSpecialties();

  const nameRef = useRef(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 200,
    }),
    menu: (provided) => ({
      ...provided,
      width: 200,
    }),
  };

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleSpecialtyChange = (selectedOption) => {
    setSelectedSpecialty(selectedOption);
  };

  let filteredDoctors = doctors?.data;

  if (selectedSpecialty || searchText) {
    const sanitizedSearchText = searchText?.replace(/\s/g, ""); // Optional chaining to handle null or undefined searchText
    const regex = new RegExp(sanitizedSearchText, "i");

    filteredDoctors = doctors.data.filter((doctor) => {
      const sanitizedDoctorName = doctor.name.replace(/\s/g, ""); // Remove white spaces from doctor's name
      return (
        (!selectedSpecialty ||
          doctor.specialty.name === selectedSpecialty.value) &&
        (!searchText || regex.test(sanitizedDoctorName))
      );
    });
  }

  return (
    <>
      <div className="text-center bg-slate-300">
        {/* filter toggle only visible on mobile devices */}
        <div
          onClick={() => setVisible(!visible)}
          className="md:hidden bg-slate-600 text-white p-3 cursor-pointer relative"
        >
          <h3>Filter</h3>
          {visible ? (
            <FaChevronDown className="absolute top-1/2 right-6 transform -translate-y-1/2" />
          ) : (
            <FaChevronRight className="absolute top-1/2 right-6 transform -translate-y-1/2" />
          )}
        </div>

        {/* inputs */}
        <form
          action=""
          className={`md:flex items-center justify-center flex-wrap ${
            visible
              ? "flex transition-opacity duration-500 ease-in"
              : "hidden transition-opacity duration-500 ease-out"
          }`}
        >
          <input
            className="m-4 p-2 outline-none border-2 border-gray-400"
            placeholder="Filter by Name"
            type="text"
            ref={nameRef}
          />

          <Select
            options={specialties?.data}
            value={selectedSpecialty}
            onChange={handleSpecialtyChange}
            isSearchable={true}
            placeholder="Filter by Service"
            styles={customStyles}
          />
          <button
            onClick={() => {
              setSearchText("");
              setSelectedSpecialty(null);
            }}
            type="reset"
            className="p-2 px-4 bg-gray-500 text-white m-4"
          >
            Clear Filter
          </button>
          <button
            style={{ background: "#004680" }}
            type="button"
            className="p-2 px-4 text-white m-4"
            onClick={() => {
              setSearchText(nameRef.current.value);
              nameRef.current.value = "";
            }}
          >
            Filter Results
          </button>
        </form>
      </div>

      <div className="p-6">
        <h1 className="text-center mb-8 text-5xl" style={{ color: "#004680" }}>
          Find a Doctor
        </h1>
        {/* no doctors in db */}
        {!isLoading && !doctors?.data && (
          <h2
            className="text-center mt-4 text-2xl"
            style={{ color: "#004680" }}
          >
            There are no Doctors at the moment.
          </h2>
        )}

        {/* if there are no doctors for search */}
        {(searchText || selectedSpecialty) && filteredDoctors?.length === 0 && (
          <h2
            className="text-center mt-4 text-2xl"
            style={{ color: "#004680" }}
          >
            There are no Doctors for this Search.
          </h2>
        )}

        {/* doctors grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* loading skeleton */}
          {isLoading &&
            items.map((item, index) => (
              <div
                key={index}
                className="justify-self-center shadow-lg rounded-sm overflow-hidden w-full"
              >
                <div className="h-72 bg-gradient-to-r from-blue-300 to-blue-200 animate-pulse shadow-lg"></div>
                <div className="p-4 bg-white text-left border-2 border-slate-400">
                  <h3 className="text-lg md:text-2xl lg:text-3xl bg-gradient-to-r from-blue-300 to-blue-200 animate-pulse h-9"></h3>
                  <p className="text-sm md:text-base lg:text-lg bg-gradient-to-r from-blue-300 to-blue-200 animate-pulse h-7"></p>
                  <p className="text-sm md:text-base lg:text-lg bg-gradient-to-r from-blue-300 to-blue-200 animate-pulse h-7"></p>
                </div>
              </div>
            ))}

          {/* doctor cards */}
          {filteredDoctors?.map((doctor, index) => (
            <div
              className="justify-self-center shadow-lg rounded-sm overflow-hidden w-full"
              key={index}
            >
              <img
                className="object-cover h-72 w-full"
                src={doctor.img ? doctor.img : doctorPic.src}
                alt=""
              />
              <div
                style={{ color: "#004680" }}
                className="p-4 bg-white text-left border-2 border-slate-400 relative"
              >
                <img
                  className="h-16 w-16 object-cover absolute bottom-2 right-2"
                  src={avita.src}
                  alt=""
                />
                <h3 className="text-lg md:text-2xl lg:text-3xl font-bold">
                  {doctor.name}
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  {doctor.specialty.name}
                </p>
                <p className="text-sm md:text-base lg:text-lg">
                  {doctor.telephone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;
