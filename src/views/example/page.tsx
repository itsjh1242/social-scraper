// ui
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// store
import { useAuthStore } from "@/stores";
// type
import { UserType } from "@/stores/useAuthStore";
// component
import GridUserData from "./gridUserData";

const SAMPLE_USER: UserType = {
  uid: "sample123@gmail.com",
  name: "John Doe",
  token: "my-special-token-1234-!@#$",
};

export const ExamplePage: React.FC = () => {
  // store
  const { user, login, logout } = useAuthStore();

  return (
    <section className="min-h-screen w-full place-content-center place-items-center p-[100px]">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col gap-2">
          <h1>
            {`Login Status: `}
            <span
              className={`rounded-lg px-2 py-1 text-white ${user ? "bg-green-700" : "bg-red-700"}`}
            >
              {user ? "LOGIN" : "LOGOUT"}
            </span>
          </h1>
          <h1>
            {`User ID: `}
            <span>{user?.uid ?? "No Data"}</span>
          </h1>
          <h1>
            {`User Name: `}
            <span>{user?.name ?? "No Data"}</span>
          </h1>
          <h1>
            {`User Token: `}
            <span>{user?.token ?? "No Data"}</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <Button disabled={!!user} onClick={() => login(SAMPLE_USER)}>
            Go Login
          </Button>
          <Button disabled={!user} variant={"outline"} onClick={logout}>
            Go Logout
          </Button>
        </div>
      </div>
      <Separator className="my-[24px]" />
      {user && <GridUserData />}
    </section>
  );
};
