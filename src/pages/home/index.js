import { Link } from "react-router-dom";
import Travel from "./components/Travel";

const Index = () => {
  return (
    <>
      <div className="jumbotron">
        <h1>Welcome</h1>
        <hr className="my-4" />
        <Link to="/create" className="btn btn-info mb-4">
          Add New Trip
        </Link>
        <Travel />
      </div>
    </>
  );
};

export default Index;
