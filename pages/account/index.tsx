import { redirectIfUnauthenticated } from "@components/hoc/redirectIfUnauthenticated";
import { AccountTemplate } from "@components/templates/AccountTemplate";
import { NextPage } from "next";

const AccountPage: NextPage = () => <AccountTemplate />;

export default redirectIfUnauthenticated(AccountPage);
