import React from 'react'
import './navagationChat.scss'
import { Popover } from 'antd';
import EmojiPicker from 'emoji-picker-react';
import {
    SmileOutlined
} from '@ant-design/icons';

export default function NavigationChat() {
    return (
        <div id='navigation-chat-box'>
            <ul>
                <Popover
                >
                    <li className='item-chat-box'>
                        <div title='Gửi sticker'>
                            <SmileOutlined />
                        </div>
                    </li>
                </Popover>
            </ul>
        </div>
    )
}
