import './navagationChat.scss'
import { Popover, Button} from 'antd';
import {
    FileImageOutlined,
} from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import Emoij from '../emoij/Emoij';
import { Icon } from '@mui/material';

export default function NavigationChat() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    // const inputRef = React.createRef();
    // const [message, setMessage] = useState('');
    // const [showEmojis, setShowEmojis] = useState();
    // const [cursorPosition, setCursorPositions] = useState();

    // const pcikEmoji = (e, { emoji }) => {
    //     const ref = inputRef.current;
    //     ref.focus();
    //     const start = message.substring(0, ref.selectionStart);
    //     const end = message.substring(ref.selectionStart);
    //     const text = start + emoji + end;
    //     setMessage(text);
    //     setCursorPositions(start.length + emoji.length);
    // }

    // const handleChange = e => {
    //     setMessage(e.target.value);
    // }

    // const handleShowEmojis = () => {
    //     inputRef.current.focus();
    //     setShowEmojis(!showEmojis);
    // }

    // useEffect(() => {
    //     inputRef.current.selectionEnd = cursorPosition;
    // }, [cursorPosition]);

    const onEmojiClick = (event, emojiObject) => {
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const styleButton = {
        background: 'none',
        outline: 'none',
        border: 'red',
        padding: '0px',
        fontSize: '2.2rem',
    }

    return (
        <div id='navigation-chat-box'>
            <ul>
                <Popover
                >
                    <li className='item-chat-box'>
                        <div title='Gửi sticker'>
                            <div className="showPickers">
                                {showPicker && <Picker height={350} width={350}
                                    emojiStyle={'apple'}
                                    autoFocusSearch='true'
                                    placement='topLeft'
                                    onEmojiClick={onEmojiClick} />}
                            </div>
                            <img
                                className="emoji-icon"
                                src={PF + "sticker/sticker.svg"}
                                onClick={() => setShowPicker(val => !val)} />
                        </div>
                    </li>
                    <li className='item-chat-box'>

                        <Button
                            title='Gửi file'
                            type="text"
                            style={styleButton}
                        > <FileImageOutlined />
                        </Button>

                    </li>
                </Popover>
            </ul>
        </div>
    )
}
