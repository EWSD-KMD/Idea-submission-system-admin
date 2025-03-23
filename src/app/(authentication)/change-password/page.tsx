import { ChangePasswordForm } from "./components/changePasswordForm";

const Page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="p-8 text-center">
        <p className="text-xl font-semibold text-primary">
          Change Your Password
        </p>
      </div>
      <ChangePasswordForm />
    </div>
  );
};

export default Page;
