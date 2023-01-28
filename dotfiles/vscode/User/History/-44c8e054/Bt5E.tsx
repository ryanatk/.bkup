import React from 'react';

export interface PageContainerProps {
  /** name of page */
  name: string;
  /** padding control */
  padding?: 'top' | 'bottom' | 'both' | 'none';
  /** optional additional classNames */
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  name,
  padding = 'both',
  className = '',
  children,
}) => {
  const getPadding = () => {
    switch (padding) {
      case 'top':
        return 'pt-16';
      case 'bottom':
        return 'pb-16';
      case 'none':
        return;
      default:
        return 'py-16';
    }
  };

  return (
    <div data-cy={`page-${name}`} className={`${getPadding()} ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
