import { exampleAPIClient } from "./config";

export class ExampleService {
  // 사용자 목록 가져오기
  fetchUser = async () => {
    const response = await exampleAPIClient.get("/users");
    return response.data;
  };

  // 특정 사용자 가져오기
  fetchUserById = async (id: number) => {
    const response = await exampleAPIClient.get(`/users/${id}`);
    return response.data;
  };

  // 새로운 사용자 추가
  createUser = async (userData: { name: string; email: string }) => {
    const response = await exampleAPIClient.post("/users", userData);
    return response.data;
  };

  // 사용자 삭제
  deleteUser = async (id: number) => {
    const response = await exampleAPIClient.delete(`/users/${id}`);
    return response.data;
  };
}
