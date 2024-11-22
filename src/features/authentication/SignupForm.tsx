import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from '../../hooks/auth/useSignup';

const emailRegex = /\S+@\S+\.\S+/;

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignupForm() {
  const { signup, isLoading } = useSignup();

  const { register, formState, getValues, handleSubmit, reset } =
    useForm<SignUpFormValues>();
  const { errors } = formState;

  function onSubmitSignUpForm({ email, fullName, password }: SignUpFormValues) {
    signup(
      { email, fullName, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitSignUpForm)}>
      <FormRow label="Full name" errorMessage={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register('fullName', {
            required: 'Full name is required',
          })}
        />
      </FormRow>

      <FormRow label="Email address" errorMessage={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              value: emailRegex,
              message: 'Please, provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        errorMessage={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        errorMessage={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'Password confirmation is required',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },

            validate: (valuePasswordConfirm) => {
              const password = getValues('password');
              return (
                password === valuePasswordConfirm || 'Passwords do not match'
              );
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
