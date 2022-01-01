import axios, { AxiosError } from "axios";
import { NextApiResponse } from "next";

export const defaultCatchAxios = (
  res: NextApiResponse,
  err: Error | AxiosError
) => {
  if (axios.isAxiosError(err) && err.response) {
    res.status(err.response.status || 400).end(err.response.statusText);
  } else res.status(400).end("Bad Request");
};
