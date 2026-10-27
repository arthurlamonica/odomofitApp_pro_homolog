import React, { useState } from 'react';
import { 
  Send, 
  MessageCircle, 
  User, 
  CheckCheck, 
  ChevronLeft 
} from 'lucide-react';
import type { ChatContact, ChatMessage } from '../types';

interface ChatModuleProps {
  contacts: ChatContact[];
  initialMessages: { [contactId: string]: ChatMessage[] };
}

export const ChatModule: React.FC<ChatModuleProps> = ({
  contacts,
  initialMessages
}) => {
  const [selectedContactId, setSelectedContactId] = useState<string>(contacts[0]?.id || '');
  const [messagesMap, setMessagesMap] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'professionals' | 'friends'>('all');
  
  // Mobile responsive view: toggle list vs active thread
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);

  const selectedContact = contacts.find(c => c.id === selectedContactId) || contacts[0];
  const activeMessages = messagesMap[selectedContactId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      senderName: 'Você',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessagesMap(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage]
    }));

    setInputMessage('');
  };

  const filteredContacts = contacts.filter(c => {
    if (filterRole === 'professionals') {
      return c.role === 'personal' || c.role === 'nutritionist';
    }
    if (filterRole === 'friends') {
      return c.role === 'friend';
    }
    return true;
  });

  const handleSelectContactMobile = (id: string) => {
    setSelectedContactId(id);
    setMobileThreadOpen(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto h-[560px] sm:h-[620px] antigravity-card rounded-2xl sm:rounded-3xl border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl pb-safe">
      {/* Left List: Contacts (Hidden on mobile if viewing thread) */}
      <div className={`w-full md:w-72 border-r border-white/5 flex flex-col bg-[#1E1E1E] ${
        mobileThreadOpen ? 'hidden md:flex' : 'flex'
      }`}>
        <div className="p-3.5 sm:p-4 border-b border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#bdf900]" />
              <span>Directs &amp; Profissionais</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#bdf900]/20 text-[#bdf900]">
              {contacts.length}
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-[10px] font-semibold">
            <button
              onClick={() => setFilterRole('all')}
              className={`px-3 py-1.5 rounded-xl min-h-[36px] transition-colors ${
                filterRole === 'all' ? 'bg-[#bdf900] text-black font-extrabold' : 'bg-white/5 text-slate-400'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterRole('professionals')}
              className={`px-3 py-1.5 rounded-xl min-h-[36px] transition-colors ${
                filterRole === 'professionals' ? 'bg-[#bdf900] text-black font-extrabold' : 'bg-white/5 text-slate-400'
              }`}
            >
              Profissionais
            </button>
            <button
              onClick={() => setFilterRole('friends')}
              className={`px-3 py-1.5 rounded-xl min-h-[36px] transition-colors ${
                filterRole === 'friends' ? 'bg-[#bdf900] text-black font-extrabold' : 'bg-white/5 text-slate-400'
              }`}
            >
              Amigos
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {filteredContacts.map(contact => {
            const isSelected = contact.id === selectedContactId;
            return (
              <div
                key={contact.id}
                onClick={() => handleSelectContactMobile(contact.id)}
                className={`p-3.5 flex items-center gap-3 cursor-pointer min-h-[58px] active:bg-white/5 transition-colors ${
                  isSelected ? 'bg-[#2a2a2a] md:border-l-2 md:border-[#bdf900]' : 'hover:bg-white/[0.03]'
                }`}
              >
                <div className="relative shrink-0">
                  <img 
                    src={contact.avatarUrl} 
                    alt={contact.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
                  />
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#1E1E1E]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">
                      {contact.name}
                    </h4>
                    <span className="text-[9px] text-slate-500">
                      {contact.lastMessageTime}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {contact.lastMessage}
                  </p>

                  <div className="flex items-center gap-1.5 mt-1">
                    {contact.role === 'personal' && (
                      <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#bdf900]/20 text-[#bdf900]">
                        Personal
                      </span>
                    )}
                    {contact.role === 'nutritionist' && (
                      <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#bdf900]/20 text-[#bdf900]">
                        Nutricionista
                      </span>
                    )}
                    {contact.role === 'friend' && (
                      <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-white/10 text-slate-400">
                        Amigo
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Active Chat Conversation */}
      <div className={`flex-1 flex flex-col bg-[#252525] min-w-0 ${
        mobileThreadOpen ? 'flex' : 'hidden md:flex'
      }`}>
        {/* Chat Header with Mobile Back Button */}
        <div className="p-3 sm:p-4 border-b border-white/5 flex items-center justify-between bg-[#1E1E1E]">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Mobile Back Button */}
            <button
              onClick={() => setMobileThreadOpen(false)}
              className="md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center -ml-1 text-slate-400 hover:text-white"
              aria-label="Voltar para contatos"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative shrink-0">
              <img 
                src={selectedContact.avatarUrl} 
                alt={selectedContact.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#bdf900]/30"
              />
              {selectedContact.online && (
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#1E1E1E]" />
              )}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">
                {selectedContact.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-mono truncate">
                {selectedContact.username} • {selectedContact.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3">
          {activeMessages.map(msg => (
            <div 
              key={msg.id}
              className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs ${
                msg.isMe 
                  ? 'bg-[#bdf900] text-black font-semibold rounded-br-none shadow-md shadow-[#bdf900]/20' 
                  : 'bg-white/[0.06] text-slate-200 border border-white/5 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
              <div className="flex items-center gap-1 text-[9px] text-slate-400 mt-1 px-1">
                <span>{msg.time}</span>
                {msg.isMe && <CheckCheck className="w-3 h-3 text-[#bdf900]" />}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Box (Mobile touch friendly) */}
        <form onSubmit={handleSendMessage} className="p-2.5 sm:p-3 border-t border-white/5 flex items-center gap-2 bg-[#1E1E1E]">
          <input 
            type="text" 
            placeholder={`Mensagem para ${selectedContact.name.split(' ')[0]}...`}
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            className="flex-1 min-h-[44px] bg-[#282828] border border-white/10 rounded-2xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#bdf900] transition-colors"
          />
          <button
            type="submit"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-2xl bg-[#bdf900] hover:bg-[#bdf900]/90 text-black shadow-md shadow-[#bdf900]/30 active:scale-95 transition-transform shrink-0 font-bold"
            aria-label="Enviar mensagem"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModule;
