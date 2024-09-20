"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Button from "../../components/Button";
import Input from "../../components/inputs/Input";
import LoadingModal from "../../components/modals/LoadingModal";
import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios.post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => alert("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            alert("Invalid credentials!");
          } else if (callback?.ok) {
            alert("Logged in!");
            router.push("/conversations");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        } else if (callback?.ok) {
          toast.success("Logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {session?.status === "loading" && <LoadingModal />}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="px-4 py-8 shadow sm:rounded-lg sm:px-10 bg-blue-800 border-2 border-red-400">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input disabled={isLoading} register={register} errors={errors} required id="name" label="Name" />
            )}
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="email"
              label="Email address"
              type="email"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="password"
              label="Password"
              type="password"
            />
            <div>
              <Button
                disabled={isLoading}
                fullWidth
                type="submit"
                
              >
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t  border-red-400" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className=" bg-blue-900 text-gray-200">
                  Or 
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
                
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2 px-2 text-sm  text-gray-400">
            <div onClick={toggleVariant} className="cursor-pointer underline  text-red-400">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
