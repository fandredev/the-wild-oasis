import { useState } from 'react';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import { useLogin } from '../../hooks/auth/useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
import Button from '../../ui/Button';

function LoginForm() {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin');

  const { login, isLoading } = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) return;

    login({
      email,
      password,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Log in' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
