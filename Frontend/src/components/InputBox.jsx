export function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <span className="flex justify-start">
      <label className="text-md text-gray-500 py-2">{label}</label>
      </span>
      <div>
        <input
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-2 py-2 border rounded border-slate-300"
        />
      </div>
    </div>
  );
}
