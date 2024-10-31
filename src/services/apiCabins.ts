import { CabinForm } from '../features/cabins/CreateCabinForm';
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';


export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin: CabinForm) {
  const fileName = newCabin.image[0].name

  const supabaseUrl = `${import.meta.env.VITE_SUPABASE_API_URL}`
  const imageName = `${uuidv4()}-${fileName}`.replace('/','')

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`


  // https://lfhsjrdiayqrgtljumvb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{
      ...newCabin,
      image: imagePath
    }])
    .select();

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be created');
  }

  // Upload cabin image

  const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image[0])


  // Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id as string)

    console.log(error);
    throw new Error('Cabin image could not be uploaded and the cabin image was not created');
  }


  return data;
}

export async function deleteCabin(id: number) {
  const { error, data } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}
