import React, { useState } from 'react';

type Props = {
    children: React.ReactNode;
    title: string;
};

export const Collapsible = ({ children, title }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header} onClick={toggleOpen}>
                <span>{title}</span>
            </div>
            {isOpen && <div style={styles.content}>{children}</div>}
        </div>
    );
};

const styles = {
    container: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
    },
    button: {
        padding: '5px 10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
    content: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#e9e9e9',
    },
};