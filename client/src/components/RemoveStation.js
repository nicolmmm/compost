import { useMutation } from "@apollo/client";
import { REMOVE_STATION } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

export function RemoveStationButton({ stationId }) {
  const [removeStation] = useMutation(REMOVE_STATION);
  const navigate = useNavigate();

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const removeStationres = await removeStation({
        variables: { stationId },
      });
      navigate(`/`, { replace: true });
      return removeStationres;
    } catch (e) {
      console.error("whoops!", e);
    }
  };

  return (
    <button
      className="homepage-btn btn  btn-outline-info"
      style={{ cursor: "pointer" }}
      type="button"
      onClick={handleSave}
    >
      Delete Station
    </button>
  );
}
