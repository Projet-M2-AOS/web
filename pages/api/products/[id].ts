import { defaultCatchAxios } from "@lib/api/defaultCatchAxios";
import axios from "axios";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { Product } from "types/product";

const handler: NextApiHandler = async (req, res) => {
  const { method, query } = req;
  const session = await getSession({ req });

  if (!session?.user) return res.status(401).end("Not Allowed");
  if (typeof query.id !== "string") res.status(400).end("Bad Request");

  switch (method) {
    case "GET": {
      await axios
        .get<Product[]>(process.env.NEXT_PUBLIC_GATEWAY_URL + "/products")
        .then(({ data }) => {
          const product = data.find(({ _id }) => _id === query.id);
          if (product) res.json(product);
          else res.status(404).end("Not Found");
        })
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