import { AuthButton, Editor, LoginDialog } from "@/features";

const Page = () => {
  return (
    <div className="bg-surface-up">
      <AuthButton />
      dummy page
      <Editor />
      <div>123</div>
      <Editor />
      <Editor />
      <LoginDialog />
    </div>
  );
};

export default Page;
