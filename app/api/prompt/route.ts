import Prompt, { IPrompt } from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest, params: any) => {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const queryParam = new URLSearchParams(url.search);
    const q = queryParam.get('q');
    /*
    let filterQuery = {};
    if (q) {
      const regex = new RegExp(q, 'i');
      filterQuery = {
        $or: [
          {
            prompt: regex
          },
          { tag: regex }
        ]
      };
    }
    const prompts = await Prompt.find(filterQuery).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
  */
    const prompts = await Prompt.find({}).populate('creator');
    let filteredPromps = prompts;
    if (q) {
      const regex = new RegExp(q, 'i');
      filteredPromps = prompts.filter(
        prompt =>
          regex.test(prompt.creator.username) ||
          regex.test(prompt.tag) ||
          regex.test(prompt.prompt)
      );
    }

    return new Response(JSON.stringify(filteredPromps), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
