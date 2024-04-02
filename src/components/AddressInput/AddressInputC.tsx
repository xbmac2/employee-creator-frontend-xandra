import { useController } from "react-hook-form";
import usePlacesAutocomplete from "use-places-autocomplete";

export interface AddressInputProps {
  control: any; //Control;
  name: any; //FieldPath
}

const AddressInputC = ({ control, name }: AddressInputProps) => {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "Function.prototype",
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };
  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      field.onChange(description);
      clearSuggestions();
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
        name={field.name}
        ref={field.ref}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Enter new address"
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default AddressInputC;
