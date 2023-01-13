import { createClient, Auth, Users } from "supabase";
import { loadSync } from "dotenv";

const env = loadSync()
const supabase = createClient(
	env.SUPABASE_URL,
	env.SUPABASE_KEY
);

const auth = new Auth(supabase);
const users = new Users(supabase);

export async function signup(username: string, email: string, password: string) {
	const { body } = await users.create({
		email,
		password,
		username
	});
	return body;
}

export async function login(email: string, password: string) {
  const { body } = await auth.login({ email, password });
  return body;
}

export async function logout() {
  const { body } = await auth.logout();
  return body;
}

export async function get_me() {
  const { body } = await auth.whoami();
  return body;
}
