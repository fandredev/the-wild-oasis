import { supabase } from './supabase';

export interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    // not problem hard core this, because this is just for testing
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
