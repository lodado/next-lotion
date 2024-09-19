import { AuthButton, Editor, LoginDialog } from "@/features";

const Page = () => {
  return (
    <div className="bg-surface-up">
      <AuthButton />
      dummy page
      <Editor />
      <div>
        123 <Editor />
      </div>
      <Editor />
      <LoginDialog />
    </div>
  );
};

export default Page;
