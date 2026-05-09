export default function Template2({
    setTempalte,
}: {
    setTempalte: (t: string) => void;
}) {
  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Template 2</h1>
      <p>This is the content for Template 2.</p>
    </div>
  );
}