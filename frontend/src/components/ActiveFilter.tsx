import { Button } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

interface ActiveFilterProps {
  is_active: boolean | undefined;
  setIs_active: (
    state:
      | boolean
      | undefined
      | ((prev: boolean | undefined) => boolean | undefined)
  ) => void;
}

function ActiveFilter({ is_active, setIs_active }: ActiveFilterProps) {
  const handelToggle = () => {
    setIs_active((prev: boolean | undefined) => {
      if (prev === undefined) return true;
      if (prev === true) return false;
      return undefined;
    });
  };

  const renderIcon = () => {
    if (is_active === true) return <CheckBoxIcon />;
    if (is_active === false) return <DisabledByDefaultIcon color="error" />;
    return <IndeterminateCheckBoxIcon />;
  };

  return (
    <Button variant="text" onClick={handelToggle} startIcon={renderIcon()}>
      Active
    </Button>
  );
}

export default ActiveFilter;
