import React, {
  ReactElement,
  ReactEventHandler,
  useEffect,
  useMemo,
  useCallback,
  useState,
  ChangeEvent,
} from "react";
import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";

interface SearchBarProps {
  value: string;
  onChange: ReactEventHandler;
}

export default function SearchBar({
  value: initialValue,
  onChange,
}: SearchBarProps): ReactElement {
  const [value, setValue] = useState(initialValue);
  const handleOnChangeDebounced = useMemo(
    () => debounce(onChange, 500),
    [onChange]
  );
  useEffect(() => setValue(initialValue), [setValue, initialValue]);
  useEffect(
    () => () => handleOnChangeDebounced.cancel(),
    [handleOnChangeDebounced]
  );
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      handleOnChangeDebounced(e);
    },
    [setValue, handleOnChangeDebounced]
  );
  return (
    <Box display="flex" justifyContent="center" paddingTop="1rem">
      <TextField
        label="Search"
        color="secondary"
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        value={value}
        onChange={handleOnChange}
        sx={{
          minWidth: { xs: "auto", md: "20rem" },
          marginX: "auto",
          marginY: "auto",
        }}
      />
    </Box>
  );
}
