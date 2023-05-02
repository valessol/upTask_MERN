const Fields = ({ fields, onChange, values }) => {
  return (
    <>
      {fields.map((item) => {
        const { element, label, id, type, placeholder, options } = item;

        const props = {
          id,
          className: "border w-full p-2 mt-2 placeholder-gray-400 rounded-md",
          placeholder: placeholder || null,
          onChange,
          name: id,
          value: values[id],
        };

        const getTag = (element) => {
          const tags = {
            input: <input type={type} {...props} />,
            textarea: <textarea {...props} />,
            select: (
              <select {...props}>
                <option value="">-- Seleccionar --</option>
                {options?.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
                <option value=""></option>
              </select>
            ),
          };
          return tags[element];
        };

        return (
          <div key={id}>
            <label
              className="text-gray-700 uppercase font-bold text-sm"
              htmlFor={id}
            >
              {label}:
            </label>
            {getTag(element)}
          </div>
        );
      })}
    </>
  );
};
export default Fields;
