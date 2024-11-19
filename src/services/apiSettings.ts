import { Settings } from '../interfaces/Settings';
import { supabase } from './supabase';

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
  return data as unknown as Settings;
}

// We expect a newSetting object that looks like {setting: newValue}
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export async function updateSetting(newSetting: Object): Promise<Settings> {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }
  return data as unknown as Settings;
}
