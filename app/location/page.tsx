import { createClient } from "@supabase/supabase-js";

export default async function Instruments() {
  const supabase = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data: location } = await supabase.from("location").select();

  return <pre>{JSON.stringify(location, null, 2)}</pre>;
}
