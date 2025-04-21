export const fetchVercelEnvironment = async () => {
  const res = await fetch(
    "https://social-scrapper-cyp4zv475-itsjhs-projects.vercel.app/api/fetchVercelInvironment",
  );
  if (!res.ok) throw new Error("Failed to fetch Vercel environment");
  return res.json();
};
