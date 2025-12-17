export default function GivingMethod({ title, children }) {
  return (
    <div className="bg-gray-50 border rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}
