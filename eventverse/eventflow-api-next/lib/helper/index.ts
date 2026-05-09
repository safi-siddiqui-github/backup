export const sligifyHelper = (text: string) => {
  const modify = text
    .toLocaleLowerCase()
    .replaceAll(" ", "-")
    .replaceAll(".", "-");
  return `${modify}-${Date.now()}`;
};

export const sligifyEmail = async (text: string) => {
  return text.slice(0, text.search("@"));
};
