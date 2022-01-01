import { defaultCatchAxios } from "@lib/api/defaultCatchAxios";
import axios from "axios";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { Order } from "types/order";

const handler: NextApiHandler = async (req, res) => {
  const { method, query } = req;
  const session = await getSession({ req });

  if (!session?.user) return res.status(401).end("Not Allowed");

  switch (method) {
    case "GET": {
      await axios
        .get<Order[]>(process.env.NEXT_PUBLIC_GATEWAY_URL + "/orders", {
          params: query,
        })
        .then(({ data }) => {
          res.json(data.reverse());
        })
        .catch((err) => defaultCatchAxios(res, err));
      break;
    }
    case "POST": {
      await axios
        .post(
          process.env.NEXT_PUBLIC_GATEWAY_URL + "/orders",
          req.body.map((order) => ({
            ...order,
            paymentState: "done",
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
