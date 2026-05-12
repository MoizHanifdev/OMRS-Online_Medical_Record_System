'use client';

import { useState } from 'react';
import { Search, Plus, Phone, Video, MoreVertical, Image as ImageIcon, Paperclip, Smile, Mic, Send, Pin, Check, CheckCheck } from 'lucide-react';

export default function MessagingHubPage() {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    { id: 1, name: 'Cardiology Team', type: 'group', unread: 3, time: '10:42 AM', lastMsg: 'I have reviewed the echo for Mr. Fox.', online: true },
    { id: 2, name: 'Nurse Aisha', type: 'direct', unread: 0, time: 'Yesterday', lastMsg: 'Labs are drawn.', online: true },
    { id: 3, name: 'Dr. John Doe', type: 'direct', unread: 0, time: 'Monday', lastMsg: 'Can you cover my shift next Friday?', online: false },
    { id: 4, name: 'Robert Fox (Patient)', type: 'patient', unread: 1, time: '12:30 PM', lastMsg: 'My blood pressure today is 135/85.', online: false, encrypted: true }
  ];

  const messages = [
    { id: 1, sender: 'Dr. Sarah Smith', me: false, time: '10:30 AM', text: 'Has anyone reviewed the echo for Robert Fox?', status: 'read' },
    { id: 2, sender: 'You', me: true, time: '10:35 AM', text: 'I am looking at it right now. Looks like mild LVH but EF is preserved at 55%.', status: 'read' },
    { id: 3, sender: 'Dr. Sarah Smith', me: false, time: '10:42 AM', text: 'Great, thanks. I will update his care plan and start him on a low dose ACE inhibitor.', status: 'delivered' }
  ];

  return (
    <div className="flex h-screen bg-muted/10 overflow-hidden border-t border-border -m-8">
      
      {/* Left Sidebar - Conversation List */}
      <div className="w-80 bg-card border-r border-border flex flex-col z-10 shrink-0">
        <div className="p-4 border-b border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl">Messages</h2>
            <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input type="text" placeholder="Search messages..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded cursor-pointer">All</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground hover:bg-muted/80 px-2 py-0.5 rounded cursor-pointer">Unread</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground hover:bg-muted/80 px-2 py-0.5 rounded cursor-pointer">Groups</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground hover:bg-muted/80 px-2 py-0.5 rounded cursor-pointer">Patients</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {conversations.map(c => (
            <div 
              key={c.id} 
              onClick={() => setActiveConversation(c.id)}
              className={`p-4 flex gap-3 cursor-pointer hover:bg-muted/30 transition-colors ${activeConversation === c.id ? 'bg-muted/50 border-l-4 border-primary' : 'border-l-4 border-transparent'}`}
            >
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${c.type === 'group' ? 'bg-purple-500/20 text-purple-700' : c.type === 'patient' ? 'bg-amber-500/20 text-amber-700' : 'bg-blue-500/20 text-blue-700'}`}>
                  {c.name.charAt(0)}
                </div>
                {c.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-sm text-foreground truncate">{c.name}</h4>
                  <span className={`text-xs ${c.unread > 0 ? 'text-primary font-bold' : 'text-muted-foreground font-medium'}`}>{c.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-xs truncate ${c.unread > 0 ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>{c.lastMsg}</p>
                  {c.unread > 0 && <span className="ml-2 w-4 h-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center shrink-0">{c.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Area - Chat View */}
      <div className="flex-1 flex flex-col bg-background relative">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-700 flex items-center justify-center font-bold">C</div>
            <div>
              <h3 className="font-bold text-foreground leading-tight">Cardiology Team</h3>
              <p className="text-xs text-muted-foreground font-medium">4 members • Dr. Sarah Smith is typing...</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"><Phone className="w-5 h-5" /></button>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"><Video className="w-5 h-5" /></button>
            <div className="w-px h-6 bg-border mx-1"></div>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"><Search className="w-5 h-5" /></button>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"><Pin className="w-5 h-5" /></button>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-muted/5">
          <div className="flex justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-3 py-1 rounded-full">Today</span>
          </div>

          {messages.map(m => (
            <div key={m.id} className={`flex ${m.me ? 'justify-end' : 'justify-start'} group`}>
              {!m.me && (
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mr-3 mt-1">
                  {m.sender.charAt(4)}
                </div>
              )}
              <div className={`max-w-[70%] ${m.me ? 'items-end' : 'items-start'} flex flex-col`}>
                {!m.me && <span className="text-xs font-bold text-muted-foreground mb-1 ml-1">{m.sender}</span>}
                <div className={`px-4 py-2.5 rounded-2xl relative ${m.me ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-card border border-border text-foreground rounded-tl-sm shadow-sm'}`}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-[10px] font-semibold text-muted-foreground">{m.time}</span>
                  {m.me && (
                    <span className="text-primary">
                      {m.status === 'read' ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          <div className="flex justify-start">
             <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mr-3 mt-1">S</div>
             <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1 shadow-sm w-16">
               <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
               <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
               <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-card border-t border-border shrink-0">
          <div className="flex items-end gap-2 bg-muted/30 border border-border rounded-2xl p-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <div className="flex gap-1 pb-1">
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"><Smile className="w-5 h-5" /></button>
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"><Paperclip className="w-5 h-5" /></button>
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"><ImageIcon className="w-5 h-5" /></button>
            </div>
            <textarea 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message... (use @ to mention)" 
              className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[44px] py-3 px-2 text-sm text-foreground custom-scrollbar"
              rows={1}
            />
            <div className="flex gap-1 pb-1">
              {messageText.length === 0 ? (
                <button className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
              ) : (
                <button className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center transition-colors shadow-sm">
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mt-2">
             <span className="text-[10px] font-bold text-muted-foreground">Messages are end-to-end encrypted for patient interactions</span>
          </div>
        </div>

      </div>
    </div>
  );
}
