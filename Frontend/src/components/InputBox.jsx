export function InputBox({ lable, placeholder, onChange }) {
  return (
    <div>
      <div className="text-sm, font-medium py-2">{lable}</div>
      <div>
        <input
          onChange={onChange}
          placeholder={placeholder}
          className="w-full py-1 border rounded border-slate-300"
        />
      </div>
    </div>
  );
}
