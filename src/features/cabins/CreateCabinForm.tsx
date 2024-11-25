import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { FieldErrors, useForm } from 'react-hook-form';
import ICabin from '../../interfaces/Cabin';
import FormRow, { Label } from '../../ui/FormRow';
import { useCreateCabin } from '../../hooks/cabins/useCreateCabin';

export type CreateCabinForm = Omit<ICabin, 'id' | 'created_at'>;

export default function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CreateCabinForm>();

  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();

  function submitNewCabin(newCabin: CreateCabinForm) {
    createCabin(
      {
        ...newCabin,
        image: newCabin.image,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onInvalidForm(_errors: FieldErrors<CreateCabinForm>) {
    // work here in errors
  }

  return (
    <Form onSubmit={handleSubmit(submitNewCabin, onInvalidForm)} type="modal">
      <FormRow label="Cabin name" errorMessage={errors?.name?.message}>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          disabled={isCreating}
          {...register('name', {
            required: 'this field is required',
          })}
          type="text"
          id="name"
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        errorMessage={errors?.maxCapacity?.message}
      >
        <Input
          disabled={isCreating}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        errorMessage={errors?.regularPrice?.message}
      >
        <Input
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'regularPrice should be at least 1',
            },
          })}
          type="number"
          id="regularPrice"
        />
      </FormRow>

      <FormRow label="Discount" errorMessage={errors?.discount?.message}>
        <Input
          disabled={isCreating}
          {...register('discount', {
            required: 'this field is required',
            validate: (currentDiscountValue) =>
              currentDiscountValue <= getValues().regularPrice ||
              'Discount should be least than regular price',
          })}
          type="number"
          id="discount"
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        errorMessage={errors?.description?.message}
      >
        <Textarea
          disabled={isCreating}
          {...register('description', {
            required: 'this field is required',
          })}
          id="description"
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Cabin photo" errorMessage={errors?.image?.message}>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" errorMessage={errors?.image?.message}>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}
