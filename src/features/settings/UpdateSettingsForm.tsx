import { useUserSettings } from '../../hooks/settings/useSettings';
import { useUpdateSetting } from '../../hooks/settings/useUpdateSetting';
import { Settings } from '../../interfaces/Settings';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

type FieldsToUpdate =
  | 'minBookingLength'
  | 'maxBookingLength'
  | 'maxGuestsPerBooking'
  | 'breakfastPrice';

export default function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useUserSettings();
  const { isEditing, updateSetting } = useUpdateSetting();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings as unknown as Settings;

  if (isLoading) return <Spinner />;

  function handleUpdate(value: string, field: FieldsToUpdate) {
    if (!value) return;

    updateSetting({
      [field]: value,
    });
  }

  return (
    <Form>
      <FormRow
        label="Minimum nights/booking"
        onBlur={(event: React.FocusEvent<HTMLDivElement>) => {
          const target = event.target as HTMLInputElement;
          handleUpdate(target.value, 'minBookingLength');
        }}
      >
        <Input
          type="number"
          disabled={isEditing}
          id="min-nights"
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        onBlur={(event: React.FocusEvent<HTMLDivElement>) => {
          const target = event.target as HTMLInputElement;
          handleUpdate(target.value, 'maxBookingLength');
        }}
      >
        <Input
          type="number"
          disabled={isEditing}
          id="max-nights"
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        onBlur={(event: React.FocusEvent<HTMLDivElement>) => {
          const target = event.target as HTMLInputElement;
          handleUpdate(target.value, 'maxGuestsPerBooking');
        }}
      >
        <Input
          disabled={isEditing}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow
        label="Breakfast price"
        onBlur={(event: React.FocusEvent<HTMLDivElement>) => {
          const target = event.target as HTMLInputElement;
          handleUpdate(target.value, 'breakfastPrice');
        }}
      >
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}
