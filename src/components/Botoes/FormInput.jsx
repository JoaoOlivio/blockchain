const FormInput = ({ type, field, placeholder, onChange, label, value, error, disabled = false, autoComplete = ""}) => {
    return (
        <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700" htmlFor={field}>
                {label}
            </label>
            <div className="mt-1">
                <input
                    type={type}
                    disabled={disabled}
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm  ${error ? "border-red-500" : "border-gray-300"}`}
                    id={field}
                    name={field}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value || ""}
                />
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default FormInput;
