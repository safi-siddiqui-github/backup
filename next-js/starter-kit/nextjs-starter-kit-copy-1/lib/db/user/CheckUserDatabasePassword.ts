import bcrypt from 'bcrypt';

type user = {
  password: string;
  id: number;
  email: string;
  name: string;
};

export default async function CheckUserDatabasePassword(user: user, formData: FormData) {
  const compare = await bcrypt.compare(formData.get('password') as string, user?.password, );
  return compare;
}