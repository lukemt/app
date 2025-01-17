import React, { useState, useCallback } from 'react'

import { Text, Label } from '~co/common/form'

export default function BookmarkEditFormLink({ autoFocus, item: { link }, onCommit, onChange }) {
    const [maxRows, setMaxRows] = useState(1)
    
    const onChangeField = useCallback(e=>
        onChange({ [e.target.getAttribute('name')]: e.target.value }),
        []
    )

    const onFocusField = useCallback(()=>
        setMaxRows(4),
        []
    )

    return (
        <>
            <Label>URL</Label>
            <Text 
                type='url'
                required
                autoFocus={autoFocus=='link'}
                name='link'
                placeholder='https://'
                value={link}
                autoSize={true}
                maxRows={maxRows}
                onChange={onChangeField}
                onFocus={onFocusField}
                onBlur={onCommit} />
        </>
    )
}