import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import IconEye from '@/assets/images/icons/duotone/eye.svg';
import IconEyeSlash from '@/assets/images/icons/duotone/eye-slash.svg';
import IconCopy from '@/assets/images/icons/duotone/copy.svg';
import { copyToClipboard } from '@/utils/helper';
import styles from './styles.module.scss'

const HiddenString = ({ value }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={toggleVisibility} className="!fill-[#99A1B7] hover:!fill-blue-60 mr-[10px]">
        {isVisible ? (
          <InlineSVG src={IconEye} className={`w-[16px] h-[16px]`} alt="" />
        ) : (
          <InlineSVG src={IconEyeSlash} className={`w-[16px] h-[16px]`} alt="" />
        )}
      </button>
      <p className="relative inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
        {isVisible ? <span>{value}</span> : <span>****************</span>}
      </p>
      <button onClick={() => copyToClipboard(value)} className={`!fill-[#99A1B7] hover:!fill-blue-60 ml-[10px] hidden ${styles.copyBtn}`}>
        <InlineSVG src={IconCopy} className={`w-[16px] h-[16px]`} alt="" />
      </button>
    </div>
  );
};

export default HiddenString;