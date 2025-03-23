import { ForgotPasswordForm } from "./components/forgotPasswordForm";

const Page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="p-8 text-center">
        <p className="text-xl font-semibold text-primary">
          Forgot Your Password?
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default Page;
