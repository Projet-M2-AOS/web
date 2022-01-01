import { defaultCatchAxios } from "@lib/api/defaultCatchAxios";
import axios from "axios";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { Role, User } from "types/user";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case "GET": {
      if (!session?.user) return res.status(401).end("Not Allowed");
      await axios
        .get<User[]>(process.env.NEXT_PUBLIC_GATEWAY_URL + "/users")
        .then(({ data }) => {
          if (session.user.role === Role.USER)
            res.json(data.filter(({ _id }) => _id === session.user.id));
          else res.json(data);
        })
        .catch((err) => defaultCatchAxios(res, err));
      break;
    }
    case "POST": {
      await axios
        .post(
          process.env.NEXT_PUBLIC_GATEWAY_URL + "/users",
          req.body.map((user) => ({ ...user, role: "USER" }))
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
