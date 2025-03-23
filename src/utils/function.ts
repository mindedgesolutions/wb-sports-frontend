export const serialNo = (page: number, limit: number = 10): number => {
  const srno = !page || page <= 1 ? 1 : (page - 1) * limit + 1;
  return srno;
};
