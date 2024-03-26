//format all caps PERMA CONTRACT to lowercase

//format date
export const formatDate = (dateStr: string) => {
  const dateObj = new Date(Date.parse(dateStr));
  return dateObj.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};