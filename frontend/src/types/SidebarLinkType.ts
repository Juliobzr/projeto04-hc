import { ReactNode } from 'react';

export default SidebarLinkProps;

type SidebarLinkProps = {
  icon?: ReactNode;
  label: string;
  href: string;
  active?: boolean;
};