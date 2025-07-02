import { useState } from "react";
import TeamsTabel from "../components/TeamsTable";
import ActiveFilter from "../components/ActiveFilter";
import SearchFilter from "../components/SearchFilter";

function Teams() {
  const [is_active, setIs_active] = useState<boolean | undefined>(undefined);
  const [search, setSearch] = useState("");

  return (
    <>
      <SearchFilter setSearch={setSearch} />
      <ActiveFilter is_active={is_active} setIs_active={setIs_active} />
      <TeamsTabel search={search} is_active={is_active} />
    </>
  );
}

export default Teams;
