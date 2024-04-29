interface PasswordStrengthBarProps {
  password: string;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  password,
}) => {
  const getPasswordStrength = (
    password: string,
  ): "Weak" | "Fair" | "Good" | "Strong" => {
    const length = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password,
    );

    if (length && hasUppercase && hasLowercase && hasDigit && hasSpecialChar) {
      return "Strong";
    } else if (
      length &&
      ((hasUppercase && hasLowercase) || hasDigit || hasSpecialChar)
    ) {
      return "Good";
    } else if ((length && hasLowercase) || hasUppercase) {
      return "Fair";
    } else {
      return "Weak";
    }
  };

  const strength = getPasswordStrength(password);

  const getProgressStyle = () => {
    switch (strength) {
      case "Weak":
        return { backgroundColor: "red", width: "8%" };
      case "Fair":
        return { backgroundColor: "orange", width: "33%" };
      case "Good":
        return { backgroundColor: "yellow", width: "66%" };
      case "Strong":
        return { backgroundColor: "green", width: "100%" };
      default:
        return {};
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: ".5rem",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <p>Password Strength:</p> */}
        <div
          style={{
            height: "9px",
            width: "300px",
            backgroundColor: "#eee",
            borderRadius: "10px",
            overflow: "hidden",
            margin: "10px 0",
          }}
        >
          <div
            style={{
              height: "100%",
              ...getProgressStyle(),
              transition: "width 0.5s ease-in-out",
            }}
          />
        </div>
        <span>{strength}</span>
      </div>
      {/* <p>
        * Password must contain at least 8 characters, which must include digits, special characters, lowercase and uppercase letters.
        </p> */}
    </div>
  );
};

export default PasswordStrengthBar;
