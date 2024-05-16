import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const DataSkeleton = () => {
  return (
    <div>
      <Stack direction="column" gap={3}>
        <Skeleton
          variant="rectangular"
          className="skeleton-radius"
          width={"100%"}
          height={70}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          className="skeleton-radius"
          width={"100%"}
          height={70}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          className="skeleton-radius"
          width={"100%"}
          height={70}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          className="skeleton-radius"
          width={"100%"}
          height={70}
          animation="wave"
        />
      </Stack>
    </div>
  );
};

export default DataSkeleton;
