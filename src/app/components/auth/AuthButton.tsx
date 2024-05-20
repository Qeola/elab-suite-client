import { CircularProgress, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { ReactNode } from "react";

interface AuthButtonProps {
  children: ReactNode;
  isLoading: boolean;
}

const AuthButton = ({ children, isLoading }: AuthButtonProps) => {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        color: "black",
        pointerEvents: isLoading ? "none" : "auto",
        backgroundColor: "#FFCC03",
        fontWeight: 600,
        marginTop: "1rem",
        padding: "12px 24px",
        "&:hover": {
          opacity: 0.8,
          transition: "opacity 200ms ease-in",
          backgroundColor: "#FFCC03",
          boxShadow: "none",
        },
      }}
      fullWidth
      type="submit"
    >
      <Typography
        fontWeight={600}
        sx={{ display: "flex", alignItems: "center", gap: ".3rem" }}
      >
        {!isLoading ? (
          <span>{children}</span>
        ) : (
          <CircularProgress
            size={18}
            sx={{ color: "#060016", marginBlock: ".1rem" }}
            thickness={5}
          />
        )}
      </Typography>
    </Button>
  );
};

export default AuthButton;
