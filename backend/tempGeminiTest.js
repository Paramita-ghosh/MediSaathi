import dotenv from 'dotenv';
import { summarizePostContent } from './utils/geminiService.js';

dotenv.config();

const sample = `I was suffereing from loose motions, I was feeling very weak and was dehydrated properly. Due to loose motions, vomits also start and my condition was getting worsen and worsen, then my mom suggest to take entroquinol with norflox-tz which saved me to get hospitalised. highly recommended`;

const run = async () => {
  try {
    const result = await summarizePostContent(sample);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('ERROR', error);
  }
};

run();
