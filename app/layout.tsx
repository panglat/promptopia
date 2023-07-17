import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { ReactNode } from 'react';

import 'styles/globals.css';

type Props = {
  children?: ReactNode;
};

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts'
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
