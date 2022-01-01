import axios, { AxiosError } from "axios";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST": {
      await axios
        .post(
          process.env.NEXT_PUBLIC_GATEWAY_URL + "/users",
          req.body.map((user) => ({ ...user, role: "USER" }))
        )
        .then(({ data }) => data)
        .then(res.json)
        .catch((err: Error | AxiosError) => {
          if (axios.isAxiosError(err) && err.response) {
            res.status(err.response.status || 400).end(err.response.statusText);
          } else res.status(400).end("Bad Request");
        });
      break;
    }
    default: {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  }
};

export default handler;
