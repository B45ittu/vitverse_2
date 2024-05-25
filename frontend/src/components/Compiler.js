import React from 'react';

const CompilerComponent = () => {
  return (
    <div className="compiler-container">
      <iframe
        src="https://www.onlinegdb.com/online_c_compiler"
        title="Online GDB"
        width="100%"
        height="1000px"
        allowFullScreen
      />
    </div>
  );
};

export default CompilerComponent;
