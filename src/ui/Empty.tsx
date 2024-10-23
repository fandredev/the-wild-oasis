interface EmptyProps {
  resource: string;
}

export default function Empty({ resource }: EmptyProps) {
  return <p>No {resource} could be found.</p>;
}
