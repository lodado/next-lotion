import { red } from "@mui/material/colors";
import { redirect } from "next/navigation";

const Page = () => {
  const url = new URL(process.env.NEXT_PUBLIC_CLIENT_URL!);

  const baseDomain = url.hostname;
  const targetUrl = `${url.protocol}//pokitoki.${baseDomain}:${url.port}/en`;

  redirect(targetUrl);
};

export default Page;
