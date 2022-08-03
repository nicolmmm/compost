import { useMutation } from "@apollo/client";
import { REMOVE_SAVED_STATION } from "../utils/mutations";

export function RemoveSavedStationButton({ stationId }) {
  const [removeSavedStation] = useMutation(REMOVE_SAVED_STATION);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const removeSavedStationres = await removeSavedStation({
        variables: { stationId },
      });

      return removeSavedStationres;
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
      Remove Station
    </button>
  );
}
