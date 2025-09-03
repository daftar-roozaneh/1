'use client';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPass]=useState('');
  const [isLogin,setIsLogin]=useState(true);

  async function submit(e:React.FormEvent){ 
    e.preventDefault();
    const fn = isLogin
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password });
    const { error } = await fn;
    if(error) alert(error.message); else location.href='/boards';
  }

  return (
    <div className="card">
      <h2>{isLogin?'ورود':'ثبت‌نام'}</h2>
      <form onSubmit={submit}>
        <input type="email" placeholder="ایمیل" value={email} onChange={e=>setEmail(e.target.value)} />
        <div style={{height:8}}/>
        <input type="password" placeholder="رمز عبور" value={password} onChange={e=>setPass(e.target.value)} />
        <div style={{height:8}}/>
        <button className="primary">{isLogin?'ورود':'ثبت‌نام'}</button>
        <button type="button" className="ghost" onClick={()=>setIsLogin(!isLogin)} style={{marginInlineStart:8}}>
          {isLogin?'ثبت‌نام ندارید؟ بسازید':'حساب دارید؟ وارد شوید'}
        </button>
      </form>
    </div>
  );
}
