import { Product } from "@customTypes/product";
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
          .get<Product[]>(process.env.NEXT_PUBLIC_GATEWAY_URL + "/products")
          .then(({ data }) => {
            const product = data.find(({ _id }) => _id === query.id);
            if (product) res.json(product);
            else res.status(404).end("Not Found");
          })
          .catch((err) => defaultCatchAxios(res, err));
        break;
      }
      case "PUT": {
        await axios
          .put(
            process.env.NEXT_PUBLIC_GATEWAY_URL + "/products/" + query.id,
            body
          )
          .then(({ data }) => data)
          .then(res.json)
          .catch((err) => defaultCatchAxios(res, err));
        break;
      }
      case "DELETE": {
        await axios
          .delete(process.env.NEXT_PUBLIC_GATEWAY_URL + "/products/" + query.id)
          .then(({ data }) => data)
          .then(res.json)
          .catch((err) => defaultCatchAxios(res, err));
        break;
      }
      default: {
        res.setHeader("Allow", "GET, POST, DELETE");
        res.status(405).end("Method Not Allowed");
      }
    }
  }
};

export default handler;
