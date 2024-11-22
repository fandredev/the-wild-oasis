import { supabase } from './supabase';

export interface LoginProps {
  email: string;
  password: string;
}

export async function signup({
  fullName,
  email,
  password,
}: LoginProps & { fullName: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar: '',
      },
    },
  });

  let authError = null;
  const user = data?.user;

  if (user && user.identities && !user.identities.length) {
    authError = {
      name: 'AuthApiError',
      message: 'This email has already been registered',
    };
  } else if (error) {
    authError = {
      name: error.name,
      message: error.message,
    };
  }

  if (authError) throw new Error(authError.message);

  return data;
}

export async function login({ email, password }: LoginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
