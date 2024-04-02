import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export interface AddressInputProps {
  ref: any;
}

const AddressInput = ({ addressDetails, setAddressDetails }) => {
  // ref={ref}
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "Function.prototype",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  //onclick outside goes here

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };
  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      //onChange(description)
      clearSuggestions();

      //setAddressDetails(value);

      // Get latitude and longitude via utility functions
      // getGeocode({ address: description }).then((results) => {
      //   const { lat, lng } = getLatLng(results[0]);
      //   console.log("📍 Coordinates: ", { lat, lng });
      // });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <div>
      <input
        //ref={value}
        // ref={(e) => {
        //   ref(e);
        // }}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default AddressInput;
