import React, {useState} from 'react';
import InlineSVG from 'react-inlinesvg';
import IconEye from '@/assets/images/icons/duotone/eye.svg';
import IconEyeSlash from '@/assets/images/icons/duotone/eye-slash.svg';
import IconCopy from '@/assets/images/icons/duotone/copy.svg';
import {getNotification} from '@/utils/helper';

const HiddenString = ({value}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => getNotification('success', 'Copied!', 1))
  };

  return (
    <div className="w-full pr-[50px] relative ">
      <p className="relative inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
        {isVisible ? <span>{value}</span> : <span>****************</span>}
      </p>
      <div className="absolute top-[0px] right-[0px]">
        <button onClick={toggleVisibility} className="!fill-[#99A1B7] hover:!fill-blue-60 mr-[10px]">
          {isVisible ? (
            <InlineSVG src={IconEye} className={`w-[16px] h-[16px]`} alt="" />
          ) : (
            <InlineSVG src={IconEyeSlash} className={`w-[16px] h-[16px]`} alt="" />
          )}
        </button>
        <button onClick={copyToClipboard} className="!fill-[#99A1B7] hover:!fill-blue-60">
          <InlineSVG src={IconCopy} className={`w-[16px] h-[16px]`} alt="" />
        </button>
      </div>
    </div>
  );
};

export default HiddenString;
