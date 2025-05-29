import supabase from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Error fetching cabins: " + error.message);

  return data;
}

export async function createEditCabin(cabinData, id) {
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  //Create
  if (!id) query = query.insert([{ ...cabinData, image: imagePath }]);
  //Edit
  if (id) query = query.update({ ...cabinData, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) throw new Error("Error creating cabin: " + error.message);

  //Upload Image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created: " +
        storageError.message
    );
  }
  return data;
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);

  if (error) throw new Error("Error deleting cabin: " + error.message);

  return data;
}
