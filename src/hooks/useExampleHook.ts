// react
import { useEffect, useMemo, useState } from "react";
// type
import { UserType } from "@/schemas/userSchema";
// service
import { ExampleService } from "@/services";

export const useExampleHook = () => {
  const exampleService = useMemo(() => new ExampleService(), []); // memoization

  const [users, setUsers] = useState<UserType[] | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading("fetcing user data...");
      try {
        const data = (await exampleService.fetchUser()) as UserType[];
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(null);
      }
    };

    fetchUser();
  }, [exampleService]);

  return { loading, users };
};
