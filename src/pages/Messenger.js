import React from 'react';
import Sidebar from '../components/Sidebar';
import OpenCoversation from '../components/OpenConversation';
import { useConversations } from '../contexts/ConversationsProvider';

export default function Messenger({id}) {
    const {selectedConversation} = useConversations();

    return (
        <div className="d-flex" style={{height: '100vh'}}>
            <Sidebar id={id}/>
            {selectedConversation && <OpenCoversation />}
        </div>
    )
}
