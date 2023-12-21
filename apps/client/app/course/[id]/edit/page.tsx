export default function Page({ params }: { params: { id: string } }) {
  return <div>My Post EDIT: {params.id}</div>;
}
