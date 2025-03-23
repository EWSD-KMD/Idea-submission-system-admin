import { LoginForm } from "./components/LoginForm";

const Page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="p-8 text-center">
        <p className="text-xl font-semibold text-primary">
          Idea Submission System
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Page;
