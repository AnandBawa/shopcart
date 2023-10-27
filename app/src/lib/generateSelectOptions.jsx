// generate numbered options for select tag
export const generateSelectOptions = (number) => {
  const options = Array.from({ length: number }, (_, index) => {
    const value = index + 1;
    return (
      <option key={value} value={value}>
        {value}
      </option>
    );
  });

  return options;
};
