'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

type Props = { children?: ReactNode; session?: Session };

const Provider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
