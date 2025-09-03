'use client';
import { supabase, currentUserId } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function BoardsPage(){
  const [boards,setBoards]=useState<any[]>([]);
  const [title,setTitle]=useState('');

  useEffect(()=>{
    (async ()=>{
      const me = await currentUserId();
      if(!me){ location.href='/auth/login'; return; }
      const { data, error } = await supabase.from('boards').select('*').order('created_at',{ascending:false});
      if(error) console.error(error);
      setBoards(data||[]);
    })();
  },[]);

  async function createBoard(){
    const me = await currentUserId(); if(!me) return;
    if(!title.trim()) return alert('عنوان برد را وارد کنید');
    const { data, error } = await supabase.from('boards').insert({ title, created_by: me }).select().single();
    if(error){ alert(error.message); return; }
    setTitle('');
    location.href = `/b/${data!.id}`;
  }

  return (
    <>
      <div className="card">
        <h2>بردهای من</h2>
        <div className="toolbar">
          <input value={title} placeholder="عنوان برد جدید" onChange={e=>setTitle(e.target.value)} />
          <button className="primary" onClick={createBoard}>ساخت برد</button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))',gap:12}}>
        {boards.map(b=>(
          <a key={b.id} className="card" href={`/b/${b.id}`}>{b.title}</a>
        ))}
      </div>
    </>
  );
}
