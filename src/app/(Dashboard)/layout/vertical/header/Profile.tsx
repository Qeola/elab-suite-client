import React, { useState } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import * as dropdownData from "./data";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { IconMail } from "@tabler/icons-react";
import { Stack } from "@mui/system";
import Image from "next/image";
import { postRequest } from "@/utils/api/apiRequests";
import { useRouter } from "next/navigation";
import { logoutSuccess } from "@/store/authentication/AuthenticationSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authenticationState = useSelector(
    (state: AppState) => state.authentication,
  );
  const [userData, setUserData] = useState(authenticationState.userData.user);
  console.log({ authenticationState });
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    const result = await postRequest("/auth/logout");
    console.log({ result });
    if (result.data.status === "success") {
      router.push("/auth/signin");
      dispatch(logoutSuccess());
      localStorage.removeItem("token");
    }
    setIsLoading(false);
  };

  // console.log(userData);

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={userData.avatar}
          alt={"ProfileImg"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 4,
          },
        }}
      >
        <Typography variant="h5">User Profile</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={userData.avatar}
            alt={"ProfileImg"}
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
            >
              {userData.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {userData.role}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <IconMail width={15} height={15} />
              {userData.email}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        {/* <Box>
          <Link href="/add-organisation">Add an organisation</Link>
          <Link href="/profile-settings">Account Settings</Link>
        </Box> */}
        {dropdownData.profile.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link href={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink="0"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}
        <Box mt={2}>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            sx={{ fontWeight: 600 }}
            component={Link}
            href={"/auth/signin"}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
