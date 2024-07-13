import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [inputs, setInputs] = useState([]);
    const [responses, setResponses] = useState([]);
    const messagesEndRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;
        setInputs([...inputs, input]);
        setInput('');
        try {
            const res = await axios.post('http://localhost:3001/chatbot', { prompt: input });
            setResponses([...responses, res.data]);
        } catch (error) {
            console.error(error);
            setResponses([...responses, 'Error: Could not fetch response']);
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [inputs, responses]);

    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: "#333"}}>
            <div style={{backgroundColor: "#F4CD7A", height: "100px", display: "flex", justifyContent: "left", alignItems: "center"}}>
                <h1 style={{marginLeft: "40px", color: "black"}}>CuriousBot</h1>
            </div>
            <p style={{marginTop: "25px", color: "white", textAlign: "center"}}>Explore the world...</p>
            <form onSubmit={handleSubmit} style={{marginTop: "8px",marginBottom:"20px",  display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"center", gap:"20px"}}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Me Anything..."
                    style={{width: "800px", height: "50px", borderRadius: "50px", border: "1px solid #ccc",
                        //  padding: "10px",
                        padding: "10px 10px 10px 25px", // Adjust the left padding here
                        fontSize: "20px"}}
                />
                <button type="submit" style={{width: "100px", height: "50px", borderRadius: "20px", fontSize: "20px", background: input.trim() === '' ? "#ccc" : "#10ea2c", color: input.trim() === '' ? "grey" : "black"}} disabled={input.trim() === ''}>Send</button>
            </form>
            {
                inputs && inputs.length > 0 && 
            
            <div style={{
                marginTop: "20px",
                backgroundColor: "#282c34",
                color: "white",
                padding: "20px",
                maxHeight: "450px",
                overflowY: "auto",
                borderRadius: "20px",
                border: "2px solid #555",
                width: "80%",
                margin: "20px auto",
                textAlign: "left",
                scrollbarColor: "#F4CD7A",
                scrollbarWidth: "thin",
                scrollbarGutter: "20px",
                scrollBehavior: "smooth",
                wordWrap: "break-word" // Add word-wrap property
            }}>
                {inputs.map((inp, index) => (
                    <div key={index} style={{marginBottom: "10px"}}>
                        <p style={{marginBottom: "5px", color: "#FFD700", fontSize: "16px"}}>You: {inp}</p>
                        <p style={{color: "#ADFF2F", fontSize: "16px"}}>Bot: {responses[index]}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
    }
        </div>
    );
};

export default Chatbot;
