import { redirectIfUnauthenticated } from "@components/hoc/redirectIfUnauthenticated";
import { NextPage } from "next";

const AccountPage: NextPage = () => <div>account</div>;

export default redirectIfUnauthenticated(AccountPage);
