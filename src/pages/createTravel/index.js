import React, { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../../components/ui/DateRangePicker";
import ToastContext from "../../context/ToastContext";
import ImageUpload from "./components/ImageUpload";

const Index = () => {
  const { toast } = useContext(ToastContext);

  const [tripDetails, setTripDetails] = useState({
    name: "",
    destination: "",
    dates: [],
    image: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTripDetails({ ...tripDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(
      `https://628f2a700e69410599d67d03.mockapi.io/api/v1/travels`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripDetails),
      }
    );
    const result = await res.json();
    if (!result.error) {
      toast.success(`Success!`);
      setTripDetails({ name: "", destination: "", dates: "", image: "" });
      navigate("/", { replace: true });
    } else {
      toast.error(result.error);
    }
  };

  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  const getDates = useCallback((startDate, endDate) => {
    setTripDetails((prevState) => ({
      ...prevState,
      dates: [startDate, endDate],
    }));
  }, []);

  const getImageURI = useCallback((uri) => {
    setTripDetails((prevState) => ({ ...prevState, image: uri }));
  }, []);

  return (
    <>
      <h2>Create New Trip</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-form-label">
            Trip Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={tripDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="destination" className="col-form-label">
            Trip Destination
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="destination"
              name="destination"
              value={tripDetails.destination}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="date" className="col-form-label">
            Trip Date
          </label>
          <div className="col-sm-4">
            <DateRangePicker getDates={getDates} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="image" className="col-form-label">
            Trip Image
          </label>
          <div className="col-sm-4">
            <ImageUpload getImageURI={getImageURI} />
          </div>
        </div>
        <input type="submit" value="Save Trip" className="btn btn-info my-2" />
        <button className="btn btn-danger ms-2" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default Index;
