import { redirectIfAuthenticated } from "@components/hoc/redirectIfAuthentificated";
import { AuthTemplate } from "@components/templates/AuthTemplate";
import { NextPage } from "next";

const Auth: NextPage = () => <AuthTemplate />;

export default redirectIfAuthenticated(Auth);
