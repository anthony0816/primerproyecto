// /app/api/assets/route.js
import { useClaudinary } from "@/libs/cloudinary";
const cloudinary = useClaudinary();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const nextCursor = searchParams.get("next_cursor") || undefined;

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 20,
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

export async function DELETE(req) {
  const { public_id } = await req.json();
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
