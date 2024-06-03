import { TextField } from "@mui/material";
import { ThemeContext } from "../../theme/ThemeContext";
import { useContext } from "react";
import { css } from "@mui/system";

const commonTextStyles = css({
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  fontSize: "14px",
  lineHeight: "22px",
  fontWeight: 400,
  color: "inherit",
});

export const InputCustom = ({
  placeholder,
  value,
  error,
  label,
  ...rest
}: any) => {
  const { themeMode } = useContext(ThemeContext);
  const errorColor = "rgba(255,0,0,0.6)";
  const autofillColor =
    themeMode === "dark" ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)";

  const styles = {
    root: {
      "& input:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 100px ${autofillColor} inset`,
        WebkitTextFillColor: "fieldtext",
        ...commonTextStyles,
      },
    },
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      autoComplete="off"
      autoCapitalize="none"
      autoCorrect="off"
      error={error}
      value={value}
      sx={{
        ...styles,
        margin: 0,
        marginTop: "10px",
        marginBottom: "10px",
        width: "100%",
        "& .MuiInputLabel-root": {
          margin: 0,
          transform: !value
            ? "translate(14px, 11px) scale(1)"
            : "translate(14px, -10px) scale(0.75)",
          color:
            themeMode === "dark"
              ? "rgba(255,255,255, 0.6)"
              : "rgba(0,0,0, 0.6)",
          "&.Mui-focused": {
            color: error ? errorColor : "rgba(208,4,103, 1)",
            transform: "translate(14px, -10px) scale(0.75)", // Поднимаем метку и уменьшаем размер при фокусе
          },
        },
        "& .MuiOutlinedInput-root": {
          height: "45px",

          "& fieldset": {
            borderColor:
              themeMode === "dark"
                ? "rgba(255,255,255, 0.6)"
                : "rgba(0,0,0, 0.6)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(208,4,103, 1)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgba(208,4,103, 1)",
          },
          "&.Mui-error fieldset": {
            borderColor: errorColor,
          },
        },
        "& input": {
          padding: "0 14px",
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0 100px ${autofillColor} inset`,
          WebkitTextFillColor:
            themeMode === "dark"
              ? "rgba(255,255,255, 0.9)"
              : "rgba(0,0,0, 0.9)",
        },
      }}
      InputProps={{
        sx: {
          ...commonTextStyles,
          height: "45px",
          color:
            themeMode === "dark"
              ? "rgba(255,255,255, 0.9)"
              : "rgba(0,0,0, 0.6)",
          "&::placeholder": {
            fontSize: "18px",

            color:
              themeMode === "dark"
                ? "rgba(255,255,255, 0.6)"
                : "rgba(0,0,0, 0.6)",
          },
        },
      }}
      {...rest}
    />
  );
};

export default InputCustom;
