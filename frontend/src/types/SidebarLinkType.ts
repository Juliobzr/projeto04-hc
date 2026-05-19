import { ReactNode } from 'react';

export type SidebarLinkProps = {
  icon?: ReactNode;
  label: string;
  href: string;
  active?: boolean;
};