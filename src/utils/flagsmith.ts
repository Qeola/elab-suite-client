import Flagsmith from "flagsmith-nodejs";

const flagsmith = new Flagsmith({
  environmentKey: process.env.FLAGSMITH_KEY,
});

export default flagsmith;
