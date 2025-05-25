import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Error fetching cabins: " + error.message);

  return data;
}

export async function createCabin(cabinData) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabinData])
    .select();

  if (error) throw new Error("Error creating cabin: " + error.message);

  return data[0];
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);

  if (error) throw new Error("Error deleting cabin: " + error.message);

  return data;
}
