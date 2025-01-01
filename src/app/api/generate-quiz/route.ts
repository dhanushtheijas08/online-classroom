export const POST = async (req: Request) => {
  const body = await req.json();
  return Response.json({ sa: "sa" });
};
