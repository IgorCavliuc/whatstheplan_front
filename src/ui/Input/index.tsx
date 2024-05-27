import { TextField } from "@mui/material";
import { ThemeContext } from "../../theme/ThemeContext";
import { useContext } from "react";

export const Input = ({ placeholder, label, ...rest }: any) => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <TextField
      label={label}
      variant="outlined"
      sx={{
        margin: 0,
        marginTop: "10px",
        marginBottom: "10px",
        width: "100%",
        "& .MuiInputLabel-root": {
          margin: 0,
          color: darkTheme ? "rgba(255,255,255, 0.6)" : "rgba(0,0,0, 0.6)",
          "&.Mui-focused": {
            color: "rgba(208,4,103, 1)",
          },
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: darkTheme
              ? "rgba(255,255,255, 0.6)"
              : "rgba(0,0,0, 0.6)",
            color: darkTheme ? "rgba(255,255,255, 0.6)" : "rgba(0,0,0, 0.6)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(208,4,103, 1)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgba(208,4,103, 1)",
          },
        },
      }}
      InputProps={{
        sx: {
          color: darkTheme ? "rgba(255,255,255, 0.9)" : "rgba(0,0,0, 0.6)",
          "&::placeholder": {
            color: darkTheme ? "rgba(255,255,255, 0.6)" : "rgba(0,0,0, 0.6)",
          },
        },
      }}
      {...rest}
    />
  );
};
