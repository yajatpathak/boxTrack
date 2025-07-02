import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFilterProps {
  setSearch: (state: string) => void;
}

function SearchFilter({ setSearch }: SearchFilterProps) {
  const [input, setInput] = useState("");
  const [lenError, setLenError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = input.trim();

    if (trimmed.length === 0) {
      setSearch("");
      setLenError(false);
    } else if (trimmed.length >= 3) {
      setSearch(trimmed);
      setLenError(false);
    } else setLenError(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        error={lenError}
        label="Search"
        value={input}
        helperText={lenError ? "Search should at least have 3 characters." : ""}
        onChange={(e) => setInput(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </form>
  );
}

export default SearchFilter;
