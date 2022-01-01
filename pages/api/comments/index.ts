import { defaultCatchAxios } from "@lib/api/defaultCatchAxios";
import axios from "axios";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { Comment } from "types/comment";

const handler: NextApiHandler = async (req, res) => {
  const { method, query } = req;
  const session = await getSession({ req });

  if (!session?.user) return res.status(401).end("Not Allowed");

  switch (method) {
    case "GET": {
      await axios
        .get<Comment[]>(process.env.NEXT_PUBLIC_GATEWAY_URL + "/comments", {
          params: query,
        })
        .then(({ data }) => {
          res.json(
            data
              .filter(({ user }) => !query.userId || user === query.userId)
              .sort(
                (a, b) =>
                  new Date(b.createDate).getTime() -
                  new Date(a.createDate).getTime()
              )
          );
        })
        .catch((err) => defaultCatchAxios(res, err));
      break;
    }
    case "POST": {
      await axios
        .post(
          process.env.NEXT_PUBLIC_GATEWAY_URL + "/comments",
          req.body.map((comment) => ({
            ...comment,
            title: "No title",
            createDate: new Date().toISOString(),
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
