import { useState } from 'react';

const OrderBy = () => {
  const [orderBy, setOrderBy] = useState('');
  return (
    <form>
      <select
        onChange={(e) => {
          setOrderBy(e.target.value);
        }}
      >
        <option selected="selected" disabled hidden>
          Order
        </option>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
    </form>
  );
};

export default OrderBy;
