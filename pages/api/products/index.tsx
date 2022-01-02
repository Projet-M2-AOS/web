import { defaultCatchAxios } from "@lib/api/defaultCatchAxios";
import axios from "axios";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });

  if (!session?.user) res.status(401).end("Not Allowed");
  else {
    switch (method) {
      case "POST": {
        await axios
          .post(process.env.NEXT_PUBLIC_GATEWAY_URL + "/products", req.body)
          .then(({ data }) => data)
          .then(res.json)
          .catch((err) => defaultCatchAxios(res, err));
        break;
      }
      default: {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
      }
    }
  }
};

export default handler;
