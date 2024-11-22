import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUser } from '../../hooks/auth/useUser';
import { useUpdateUser } from '../../hooks/auth/useUpdateUser';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();

  const { updateUser, isLoadingUpdateUser } = useUpdateUser();

  const email = user?.email ?? '';
  const currentFullName = user?.user_metadata?.full_name ?? '';

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      {
        fullName,
        avatar,
      },
      {
        onSuccess: () => {
          setFullName('');
          setAvatar(null);
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  function handleCancel(e: React.FormEvent) {
    e.preventDefault();

    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isLoadingUpdateUser}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isLoadingUpdateUser}
          onChange={(e) => {
            if (e.target.files) {
              setAvatar(e.target.files[0]);
            }
          }}
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleCancel} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
