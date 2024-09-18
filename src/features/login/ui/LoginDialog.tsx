import { GenerateStaticParamsI18n } from "@/shared";

import { getI18n, setServerComponentSSG } from "@/shared/index.server";
import LoginDialogContainer from "./components/LoginDialogContainer";
import { getLocale } from "next-intl/server";

export function generateStaticParams() {
  return GenerateStaticParamsI18n();
}

/** // TODO
 *  layout GNB에 넣을꺼임
 */
const LoginDialog = async () => {
  const locale = await getLocale();
  setServerComponentSSG(locale);
  const t = await getI18n("LOGIN");

  return <LoginDialogContainer />;
};

export default LoginDialog;
