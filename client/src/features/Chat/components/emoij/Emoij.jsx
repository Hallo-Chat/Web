import React from 'react'
import PropTypes from 'prop-types';
import { EmojiPickerContainer, EmojiContainer } from './emoij.styles'
import { } from './emoij.styles'

export default function Emoij(pickerEmoji) {
    return (
        <EmojiContainer>
            <EmojiPickerContainer onEmojiClick={pickerEmoji} />
        </EmojiContainer>
    );
};

Emoij.propTypes = {
    pickerEmoji: PropTypes.func,
}

