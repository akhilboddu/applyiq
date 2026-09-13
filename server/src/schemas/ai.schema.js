const Joi = require("joi");

const coverLetterSchema = Joi.object({
  applicationId: Joi.string().required(),
  jobTitle: Joi.string().min(2).max(100).required(),
  companyName: Joi.string().min(2).max(100).required(),
  jobDescription: Joi.string()
    .min(20)
    .max(3000)
    .required()
    .messages({
      "string.min": "A short job description produces a weak, generic letter — paste more of the posting",
    }),
  candidateSkills: Joi.array().items(Joi.string()).min(1).required(),
  tone: Joi.string()
    .valid("professional", "enthusiastic", "formal")
    .default("professional"),
});

module.exports = { coverLetterSchema };
