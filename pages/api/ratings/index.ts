import { Rating } from "@customTypes/rating";
import { defaultCatchAxios } from "@lib/api/defaultCatchAxios";
import axios from "axios";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const { method, query } = req;
  const session = await getSession({ req });

  if (!session?.user) return res.status(401).end("Not Allowed");

  switch (method) {
    case "GET": {
      await axios
        .get<Rating[]>(process.env.NEXT_PUBLIC_GATEWAY_URL + "/ratings", {
          params: query,
        })
        .then(({ data }) => {
          res.json(data);
        })
        .catch((err) => defaultCatchAxios(res, err));
      break;
    }
    case "POST": {
      await axios
        .post(
          process.env.NEXT_PUBLIC_GATEWAY_URL + "/ratings",
          req.body.map((rating) => ({
            ...rating,
            date: new Date().toISOString().split("T")[0],
          }))
        )
        .then(({ data }) => data)
        .then(res.json)
        .catch((err) => defaultCatchAxios(res, err));
      break;
    }
    default: {
      res.setHeader("Allow", "GET, POST");
      res.status(405).end("Method Not Allowed");
    }
  }
};

export default handler;
