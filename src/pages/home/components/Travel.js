import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";

import Spinner from "../../../components/ui/Spinner";
import ToastContext from "../../../context/ToastContext";

const Travel = () => {
  const { toast } = useContext(ToastContext);

  const [loading, setLoading] = useState(false);
  const [travelList, setTravelList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://628f2a700e69410599d67d03.mockapi.io/api/v1/travels`
      );
      const data = await res.json();

      if (!data.error) {
        setTravelList(data);
        setLoading(false);
      } else {
        console.log(data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteContact = async (id) => {
    try {
      const res = await fetch(
        `https://628f2a700e69410599d67d03.mockapi.io/api/v1/travels/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await res.json();
      if (!result.error) {
        setTravelList(result.myContacts);
        toast.success("Trip has been deleted.");
        setShowModal(false);
        fetchData();
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTravelDates = (dates) => {
    const [startDate, endDate] = dates;
    let start = moment(startDate).format("DD/MM/YYYY");
    let end = moment(endDate).format("DD/MM/YYYY");

    return `${start} - ${end}`;
  };

  return (
    <>
      <div>
        {loading || !travelList ? (
          <Spinner splash="Loading..." />
        ) : (
          <>
            {travelList?.length === 0 ? (
              <h3>No trips to show.</h3>
            ) : (
              <>
                <p>
                  Your Total Trips: <strong>{travelList.length}</strong>
                </p>

                <div className="row">
                  {travelList.map((travel) => (
                    <div key={travel.id} className="col-sm-3 my-2">
                      <div className="card">
                        <figure style={{ height: 200 }}>
                          <img
                            style={{
                              backgroundSize: "contain",
                              height: "100%",
                            }}
                            src={
                              travel.image.base64 || "https://picsum.photos/200"
                            }
                            className="card-img-top"
                            alt={travel.name}
                          />
                        </figure>

                        <div className="card-body">
                          <h5 className="card-title">{travel.name}</h5>
                          <p className="card-text">
                            {getTravelDates(travel.dates)}
                          </p>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setModalData(travel);
                              setShowModal(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Trip</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this trip?</p>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => deleteContact(modalData.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Travel;
