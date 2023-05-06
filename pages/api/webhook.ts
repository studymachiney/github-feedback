import { createHmac } from 'crypto'
import { Request, Response } from 'express'

export default async function handleWebhook(req: Request, res: Response & Record<string, any>) {
  const body = await getRawBody(req)
  if (!body) {
    res.status(400).send('Bad request (no body)')
    return
  }

  const jsonBody = JSON.parse(body)

  const secret = process.env.GITHUB_WEBHOOK_SECRET
  const signature = req.headers['x-hub-signature-256']
  const computedSignature =
    'sha256=' + createHmac('sha256', secret!).update(body).digest('hex')

  if (computedSignature === signature) {
    console.log(
      'event',
      req.headers['x-github-event'],
      'action',
      jsonBody.action,
      'issue',
      jsonBody.issue?.title,
      jsonBody.issue?.number
    )
    const issueNumber = jsonBody.issue?.number;

    console.log('[Next.js] Revalidating /');
    await res.revalidate('/');

    if (issueNumber) {
      console.log(`[Next.js] Revalidating /${issueNumber}`);
      await res.revalidate(`/${issueNumber}`);
    }

    return res.status(200).send('Success!');
  } else {
    res.status(403).send('Forbidden');
  }

}

function getRawBody(req: Request) {
  return new Promise<string>((resolve, reject) => {
    let bodyChunks: Uint8Array[] = []
    req.on('end', () => {
      const rawBody = Buffer.concat(bodyChunks).toString('utf-8')
      resolve(rawBody)
    })
    req.on('data', chunk => bodyChunks.push(chunk))
  })
}

export const config = {
  api: {
    bodyParser: false
  }
}
