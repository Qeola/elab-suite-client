import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import {
  Business,
  BusinessCenter,
  BusinessOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as dropdownData from "./data";
import { getRequest } from "@/utils/api/apiRequests";

const OrganisationList = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [organisations, setOrganisations] = useState<any[]>([]);
  const authenticationState = useSelector(
    (state: AppState) => state.authentication,
  );
  const [userData, setUserData] = useState(authenticationState.userData.user);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    async function getOrganisations() {
      try {
        setIsLoading(true);
        const response = await getRequest(
          `/users/${userData.username}/user-organisations`,
        );
        setOrganisations(response.data.data || []);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getOrganisations();
  }, [userData]);
  return (
    <Box>
      <Tooltip title="Organisations" placement="bottom">
        <IconButton
          size="large"
          color="inherit"
          aria-controls="orgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === "object" && {
              color: "gray",
            }),
          }}
          onClick={handleClick2}
        >
          <BusinessOutlined />
        </IconButton>
      </Tooltip>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="orgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "250px",
            px: 2,
            py: 1,
          },
        }}
      >
        <Typography variant="h5">Organisations</Typography>
        <Divider sx={{ my: 1 }} />
        {organisations ? (
          <Stack direction={"column"} gap={0.5}>
            {organisations &&
              organisations.map((org) => (
                <Box key={org.id}>
                  <Box>
                    <Link
                      href={`/organisation/all-organisation/${org.organisation.slug}`}
                    >
                      <Stack direction="row" spacing={2}>
                        <Box width={"100%"}>
                          <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            color="textPrimary"
                            // className="text-hover"
                            noWrap
                            sx={{
                              p: 1,
                              width: "100%",
                              borderRadius: "7px",
                              transition: "background-color 0.3s ease",
                              "&:hover": {
                                bgcolor: `${"primary.light"}`,
                              },
                            }}
                          >
                            {org.organisation.name}
                          </Typography>
                        </Box>
                      </Stack>
                    </Link>
                  </Box>
                </Box>
              ))}
          </Stack>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={"20px"}
            className="skeleton-radius"
          />
        )}
      </Menu>
    </Box>
  );
};

export default OrganisationList;
