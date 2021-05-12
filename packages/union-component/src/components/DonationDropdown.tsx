import React, { SelectHTMLAttributes } from 'react';
import { Input } from './DonationWizard';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

const DonationDropdown: React.FC<Props> = (props) => {
  const { className = '' } = props;

  return (
    <div className="relative form-control">
      <Input as="select" {...props} className={`${className} appearance-none`}>
        {props.children}
      </Input>
      <span
        className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none material-icons"
        style={{ display: 'flex' }}
      >
        expand_more
      </span>
    </div>
  );
};

export default DonationDropdown;
