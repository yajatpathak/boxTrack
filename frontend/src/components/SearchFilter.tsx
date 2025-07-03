import React, { useState } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ width: 300 }}
    >
      <TextField
        fullWidth
        error={lenError}
        label="Search"
        value={input}
        size="small"
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
    </Box>
  );
}

export default SearchFilter;
