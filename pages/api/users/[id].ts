import { User } from "@customTypes/user";
import { defaultCatchAxios } from "@lib/api/defaultCatchAxios";
import axios from "axios";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const { body, method, query } = req;
  const session = await getSession({ req });

  if (!session?.user) res.status(401).end("Not Allowed");
  else if (typeof query.id !== "string") res.status(400).end("Bad Request");
  else {
    switch (method) {
      case "GET": {
        await axios
          .get<User[]>(
            process.env.NEXT_PUBLIC_GATEWAY_URL + "/users/" + query.id
          )
          .then(({ data }) => {
            res.json(data);
          })
          .catch((err) => defaultCatchAxios(res, err));
        break;
      }
      case "PUT": {
        await axios
          .put(process.env.NEXT_PUBLIC_GATEWAY_URL + "/users/" + query.id, body)
          .then(({ data }) => data)
          .then(res.json)
          .catch((err) => defaultCatchAxios(res, err));
        break;
      }
      default: {
        res.setHeader("Allow", "GET, PUT");
        res.status(405).end("Method Not Allowed");
      }
    }
  }
};

export default handler;
