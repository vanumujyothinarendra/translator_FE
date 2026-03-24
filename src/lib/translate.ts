import API from "./api";

export const translateText = async (text: string, language: string) => {
  const token = localStorage.getItem("token");
  console.log(token)

  return API.post(
    "translate/",
    {
      text,
      target_language: language,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};