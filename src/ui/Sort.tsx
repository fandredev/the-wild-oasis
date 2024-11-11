import { useSearchParams } from 'react-router-dom';
import Select from './Select';

interface SortProps {
  options: { label: string; value: string }[];
}

export default function SortBy({ options }: SortProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy =
    options.length > 0 ? searchParams.get('sortBy') || options[0].value : '';

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}
