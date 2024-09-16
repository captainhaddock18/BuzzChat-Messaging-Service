import AuthForm from "../(site)/components/AuthForm";
import Navbar from "../(site)/components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-blue-50 dark:bg-blue-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-blue-700 dark:text-red-400">
          Sign in!
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm />
      </div>
    </div>
    </>

  );
}
