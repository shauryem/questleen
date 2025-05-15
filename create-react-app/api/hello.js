// api/hello.js
// A simple Vercel Serverless Function handler

export default function handler(req, res) {
    const { name = 'world' } = req.query;
    res.status(200).json({ message: `Hello, ${name}!` });
  }