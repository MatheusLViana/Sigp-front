import "./Servicecard.css";
import { Clipboard2Check } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Servicecard({ category, title, href }) {
  return (
    <Link to={href} className="service-card-link">
      <div className="blue-card">
        <div className="intern-container">
          <div className="row">
            <Clipboard2Check size={48} />
            <div className="category-container">
              <h3>{category}</h3>
            </div>
          </div>
          <h2 className="service-card-title">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Servicecard;
