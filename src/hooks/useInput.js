import React, { useState } from "React";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);

  return [value, onChange];
};

export default useInput;
