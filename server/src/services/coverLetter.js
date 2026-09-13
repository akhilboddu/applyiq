// services/coverLetter.js — pure logic, no HTTP
const openai = require("./openai");

function buildCoverLetterPrompt({ jobTitle, companyName, jobDescription, candidateSkills, tone }) {
  return `Write a ${tone} cover letter for a ${jobTitle} role at ${companyName}.
Job description: ${jobDescription}
Candidate skills: ${candidateSkills.join(', ')}
Rules: 3 short paragraphs — hook, evidence, close.
Never use cliches like "passionate" or "team player".`
}

async function generateCoverLetter(data) {
  const prompt = buildCoverLetterPrompt(data);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert at writing concise, tailored cover letters." },
      { role: "user", content: prompt },
    ],
  });
  return completion.choices[0].message.content;
}

// Same call, stream: true — returns the async iterable of chunks so the
// route can write each delta out as it arrives. Still no HTTP in here.
async function streamCoverLetter(data) {
  const prompt = buildCoverLetterPrompt(data);
  return openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      { role: "system", content: "You are an expert at writing concise, tailored cover letters." },
      { role: "user", content: prompt },
    ],
  });
}

module.exports = { generateCoverLetter, streamCoverLetter };
