import './globals.css';

export const metadata = { title: 'دفتر روزانه', description: 'ترلوی فارسی شما' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div className="container">
          <header className="header">
            <b>دفتر روزانه</b>
            <nav>
              <a className="badge" href="/boards">بردها</a>
              <a className="badge" href="/auth/login" style={{marginInlineStart:8}}>ورود</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
