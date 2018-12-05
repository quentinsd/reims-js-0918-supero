import React from "react";
import { Input } from "reactstrap";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <Input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export default renderField;
