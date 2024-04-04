import React from 'react';

interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <h1 className="w-full text-left
    text-[24px] font-bold leading-[140%] tracking-tighter
    md:text-[30px] md:font-bold md:leading-[140%] md:tracking-tighter">
      {title}
    </h1>
  );
};

export default Heading;
