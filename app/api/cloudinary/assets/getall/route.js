import { useClaudinary } from "@/libs/cloudinary";
const cloudinary = useClaudinary();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const nextCursor = searchParams.get("next_cursor") || undefined;

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      next_cursor: nextCursor,
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
